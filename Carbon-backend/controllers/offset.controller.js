const Activity = require("../models/Activity");
const PDFDocument = require("pdfkit");
const { getPersonalizedTips } = require("../utils/tipHelper");

// Get monthly carbon offset recommendations
exports.getMonthlyOffset = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get current month's date range
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    // Fetch all activities for the current month
    const activities = await Activity.find({
      user: userId,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth
      }
    });

    // Calculate total CO2 in kg
    const totalCO2 = activities.reduce((sum, activity) => sum + activity.carbonFootprint, 0);

    // Calculate trees required for MONTHLY offset (1 tree absorbs ~21kg CO2/year)
    // Monthly trees = monthlyCO2 / 21
    const monthlyTreesRequired = Math.ceil(totalCO2 / 21);

    // Yearly projection (for planning purposes)
    const yearlyCO2Projection = totalCO2 * 12;
    const yearlyTreesRequired = Math.ceil(yearlyCO2Projection / 21);

    // Calculate renewable energy cost (₹1000 per ton CO2)
    // 1 ton = 1000 kg
    const renewableEnergyCost = Math.round((totalCO2 / 1000) * 1000);

    // Estimate lifestyle actions
    // Cycling instead of driving saves ~2.5kg CO2 per 10km commute
    const cyclingDays = Math.ceil(totalCO2 / 2.5);

    // Meat-free day saves ~3.5kg CO2 per day
    const meatFreeDays = Math.ceil(totalCO2 / 3.5);

    res.json({
      month: now.toLocaleString("default", { month: "long", year: "numeric" }),
      totalCO2: Math.round(totalCO2 * 100) / 100, // Round to 2 decimal places
      activitiesCount: activities.length,
      note: "All offset values are estimates for awareness purposes",
      offsetOptions: {
        monthlyOffset: {
          treesRequired: {
            count: monthlyTreesRequired,
            description: `Plant ${monthlyTreesRequired} trees to offset this month's emissions (1 tree absorbs ~21kg CO2/year)`
          },
          renewableEnergyCost: {
            amount: renewableEnergyCost,
            currency: "INR",
            description: `Invest ₹${renewableEnergyCost} in renewable energy projects (estimated ₹1000 per ton CO2)`
          }
        },
        yearlyOffset: {
          projectedCO2: Math.round(yearlyCO2Projection * 100) / 100,
          treesRequired: {
            count: yearlyTreesRequired,
            description: `Plant ${yearlyTreesRequired} trees to offset projected yearly emissions based on this month's activity`
          }
        },
        lifestyleActions: {
          note: "Approximate estimates to offset this month's emissions",
          cyclingDays: {
            count: cyclingDays,
            description: `Cycle instead of driving for ${cyclingDays} days (10km commute each, saves ~2.5kg CO2/day)`
          },
          meatFreeDays: {
            count: meatFreeDays,
            description: `Go meat-free for ${meatFreeDays} days (saves ~3.5kg CO2/day)`
          }
        }
      }
    });
  } catch (err) {
    console.error("OFFSET CALCULATION ERROR:", err);
    res.status(500).json({ message: "Error calculating offset", error: err.message });
  }
};

// Generate Monthly Carbon Report as PDF
exports.generateMonthlyReport = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get current month's date range (month-so-far)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthName = now.toLocaleString("default", { month: "long", year: "numeric" });

    // Fetch all activities for the current month (till now)
    const activities = await Activity.find({
      user: userId,
      createdAt: {
        $gte: startOfMonth,
        $lte: now
      }
    }).sort({ createdAt: -1 });

    // Calculate total CO2 in kg (default to 0 if carbonFootprint is missing)
    const totalCO2 = activities.reduce((sum, activity) => sum + (activity.carbonFootprint || 0), 0);

    // Calculate offset suggestions (same formulas as getMonthlyOffset)
    const monthlyTreesRequired = Math.ceil(totalCO2 / 21);
    const yearlyCO2Projection = totalCO2 * 12;
    const yearlyTreesRequired = Math.ceil(yearlyCO2Projection / 21);
    const renewableEnergyCost = Math.round((totalCO2 / 1000) * 1000);
    const cyclingDays = Math.ceil(totalCO2 / 2.5);
    const meatFreeDays = Math.ceil(totalCO2 / 3.5);

    // Activity-wise breakdown by type
    const activityBreakdown = activities.reduce((acc, activity) => {
      const type = activity.type || 'other';
      const footprint = activity.carbonFootprint || 0;
      if (!acc[type]) {
        acc[type] = { count: 0, totalCO2: 0 };
      }
      acc[type].count += 1;
      acc[type].totalCO2 += footprint;
      return acc;
    }, {});

    // Sort categories by emissions for tip prioritization
    const sortedCategories = Object.entries(activityBreakdown)
      .map(([category, data]) => ({
        category,
        count: data.count,
        totalCO2: data.totalCO2
      }))
      .sort((a, b) => b.totalCO2 - a.totalCO2);

    // Fetch exactly 5 personalized tips using shared helper (single source of truth)
    const personalizedTips = await getPersonalizedTips(sortedCategories);

    // Create PDF document
    const doc = new PDFDocument({ margin: 50 });

    // Handle PDF stream errors
    doc.on("error", (err) => {
      console.error("PDF STREAM ERROR:", err);
      if (!res.headersSent) {
        res.status(500).set("Content-Type", "text/plain").send("Error generating PDF");
      } else {
        res.end();
      }
    });

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Carbon_Report_${now.getFullYear()}_${now.getMonth() + 1}.pdf"`
    );

    // Pipe PDF to response
    doc.pipe(res);

    // PDF Content
    // Title
    doc.fontSize(24).font("Helvetica-Bold").text("Monthly Carbon Footprint Report", { align: "center" });
    doc.fontSize(16).font("Helvetica").text(monthName, { align: "center" });
    doc.moveDown();

    // Generation date
    doc.fontSize(10).fillColor("#666666")
      .text(`Report generated on: ${now.toLocaleDateString("en-IN", { 
        day: "numeric", 
        month: "long", 
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })}`, { align: "center" });
    doc.moveDown(2);

    // Summary Section
    doc.fillColor("#000000").fontSize(16).font("Helvetica-Bold").text("Summary");
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    doc.fontSize(12).font("Helvetica")
      .text(`Total CO₂ Emitted: ${(Math.round(totalCO2 * 100) / 100).toFixed(2)} kg`)
      .text(`Total Activities Logged: ${activities.length}`)
      .text(`Period: ${startOfMonth.toLocaleDateString("en-IN")} - ${now.toLocaleDateString("en-IN")}`);
    doc.moveDown(1.5);

    // Activity-wise Breakdown
    doc.fontSize(16).font("Helvetica-Bold").text("Activity-wise Breakdown");
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    if (Object.keys(activityBreakdown).length > 0) {
      Object.entries(activityBreakdown).forEach(([type, data]) => {
        const percentage = totalCO2 > 0 ? ((data.totalCO2 / totalCO2) * 100).toFixed(1) : 0;
        doc.fontSize(11).font("Helvetica")
          .text(`• ${type.charAt(0).toUpperCase() + type.slice(1)}: ${data.totalCO2.toFixed(2)} kg CO₂ (${data.count} activities, ${percentage}%)`);
      });
    } else {
      doc.fontSize(11).font("Helvetica").text("No activities logged this month.");
    }
    doc.moveDown(1.5);

    // Detailed Activity Log
    doc.fontSize(16).font("Helvetica-Bold").text("Recent Activities");
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    const recentActivities = activities.slice(0, 10);
    if (recentActivities.length > 0) {
      recentActivities.forEach((activity, index) => {
        const date = new Date(activity.createdAt).toLocaleDateString("en-IN");
        const type = activity.type || 'other';
        const footprint = (activity.carbonFootprint || 0).toFixed(2);
        doc.fontSize(10).font("Helvetica")
          .text(`${index + 1}. ${type.charAt(0).toUpperCase() + type.slice(1)} - ${footprint} kg CO₂ (${date})`);
      });
      if (activities.length > 10) {
        doc.fontSize(10).font("Helvetica-Oblique").text(`... and ${activities.length - 10} more activities`);
      }
    } else {
      doc.fontSize(11).font("Helvetica").text("No activities logged this month.");
    }
    doc.moveDown(1.5);

    // Offset Suggestions
    doc.fontSize(16).font("Helvetica-Bold").text("Offset Suggestions");
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    doc.fontSize(12).font("Helvetica-Bold").text("Monthly Offset:");
    doc.fontSize(11).font("Helvetica")
      .text(`• Plant ${monthlyTreesRequired} trees (1 tree absorbs ~21kg CO₂/year)`)
      .text(`• Invest ₹${renewableEnergyCost} in renewable energy projects`);
    doc.moveDown(0.5);

    doc.fontSize(12).font("Helvetica-Bold").text("Yearly Projection:");
    doc.fontSize(11).font("Helvetica")
      .text(`• Projected yearly emissions: ${(Math.round(yearlyCO2Projection * 100) / 100).toFixed(2)} kg CO₂`)
      .text(`• Plant ${yearlyTreesRequired} trees for yearly offset`);
    doc.moveDown(0.5);

    doc.fontSize(12).font("Helvetica-Bold").text("Lifestyle Actions:");
    doc.fontSize(11).font("Helvetica")
      .text(`• Cycle instead of driving for ${cyclingDays} days (10km commute each)`)
      .text(`• Go meat-free for ${meatFreeDays} days`);
    doc.moveDown(1.5);

    // Personalized Tips Section (exactly 5 tips from shared helper)
    doc.fontSize(16).font("Helvetica-Bold").text("Personalized Tips");
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    if (personalizedTips.length > 0) {
      personalizedTips.forEach((tip, index) => {
        doc.fontSize(11).font("Helvetica")
          .text(`${index + 1}. [${tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}] ${tip.message}`);
      });
    } else {
      doc.fontSize(11).font("Helvetica").text("No personalized tips available.");
    }
    doc.moveDown(1.5);

    // Disclaimer
    doc.fontSize(9).font("Helvetica-Oblique").fillColor("#888888")
      .text("Disclaimer: All values presented in this report are estimates for awareness purposes only. Actual carbon footprint may vary based on various factors. Tree absorption rates, renewable energy costs, and lifestyle action savings are approximate averages.", { 
        align: "justify",
        width: 500 
      });
    doc.moveDown();

    // Footer
    doc.fontSize(10).font("Helvetica").fillColor("#666666")
      .text("Generated by Carbon Tracker", { align: "center" });

    // Finalize PDF
    doc.end();

  } catch (err) {
    console.error("REPORT GENERATION ERROR:", err);
    // Never return JSON - send plain text error or end response
    if (!res.headersSent) {
      res.status(500).set("Content-Type", "text/plain").send("Error generating report");
    } else {
      // If PDF streaming started, end the response to prevent hanging
      res.end();
    }
  }
};
