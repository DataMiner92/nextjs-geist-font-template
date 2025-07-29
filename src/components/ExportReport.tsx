"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

interface ExportReportProps {
  data: any[];
  title: string;
  type: "hubs" | "users" | "assets" | "impact";
}

const ExportReport: React.FC<ExportReportProps> = ({ data, title, type }) => {
  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text(title, 20, 20);
      
      // Add date
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
      
      // Add data
      let yPosition = 50;
      doc.setFontSize(10);
      
      data.forEach((item, index) => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
        
        let text = "";
        switch (type) {
          case "hubs":
            text = `${index + 1}. ${item.name} - ${item.location} (Status: ${item.status})`;
            break;
          case "users":
            text = `${index + 1}. ${item.name} - ${item.email} (Role: ${item.role})`;
            break;
          case "assets":
            text = `${index + 1}. ${item.name} - ${item.type} (Status: ${item.status})`;
            break;
          case "impact":
            text = `${index + 1}. Trained: ${item.youthsTrained}, Earning: ${item.youthsEarning}, Stories: ${item.impactStories}`;
            break;
        }
        
        doc.text(text, 20, yPosition);
        yPosition += 10;
      });
      
      doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Failed to export PDF. Please try again.");
    }
  };

  const exportExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
      XLSX.writeFile(workbook, `${title.toLowerCase().replace(/\s+/g, '-')}.xlsx`);
    } catch (error) {
      console.error("Excel export failed:", error);
      alert("Failed to export Excel. Please try again.");
    }
  };

  const exportCSV = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, '-')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("CSV export failed:", error);
      alert("Failed to export CSV. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button onClick={exportPDF} variant="outline" size="sm">
            Export PDF
          </Button>
          <Button onClick={exportExcel} variant="outline" size="sm">
            Export Excel
          </Button>
          <Button onClick={exportCSV} variant="outline" size="sm">
            Export CSV
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {data.length} records available for export
        </p>
      </CardContent>
    </Card>
  );
};

export default ExportReport;
