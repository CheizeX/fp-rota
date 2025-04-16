import { DownloadIcon, ExcelIcon, PDFIcon } from "@/icons/icons";
import { TimeframeOption } from "@/types";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@fichap-team/fichapui";
import { Icon } from "@iconify/react";
import { EChartsInstance } from "echarts-for-react";
import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import { useState, type FC } from "react";

interface DownloadOptionsProps {
  chartRef: React.RefObject<{
    getEchartsInstance: () => EChartsInstance;
  } | null>;
  fileName?: string;
  timeframe?: TimeframeOption | string;
  year?: string;
}

interface SeriesData {
  name: string;
  data: number[];
}

/**
 * Componente para descargar el gráfico
 */
export const DownloadOptions: FC<DownloadOptionsProps> = ({
  chartRef,
  fileName = "chart",
  timeframe = "monthly",
  year = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Devuelve el nombre del período según el timeframe
   */
  const getPeriodLabel = (): string => {
    switch (timeframe) {
      case "weekly":
        return "Semanal";
      case "biweekly":
        return "Quincenal";
      case "monthly":
        return "Mensual";
      case "quarterly":
        return "Trimestral";
      case "yearly":
        return "Anual";
      default:
        return "Mensual";
    }
  };

  /**
   * Descarga del gráfico en formato PDF
   */
  const handleDownloadPDF = (): void => {
    if (!chartRef.current) return;

    const chart = chartRef.current.getEchartsInstance();
    const canvas = chart.getDom().querySelector("canvas");

    if (!canvas) return;

    // Convertimos el canvas a una imagen base64
    const dataUrl = canvas.toDataURL("image/png");

    // Usamos jsPDF para armar un documento PDF
    const pdf = new jsPDF();

    // Agregamos título y período
    pdf.setFontSize(16);
    pdf.text(fileName, 105, 15, { align: "center" });
    pdf.setFontSize(12);
    pdf.text(
      `Período: ${getPeriodLabel()}${year ? ` - Año: ${year}` : ""}`,
      105,
      25,
      { align: "center" }
    );

    // Dimensiones
    const imgWidth = 210; // A4
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const position = 35; // Margen superior

    // Metemos la imagen en el PDF
    pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);

    // Guardamos el PDF con el nombre que pasamos
    pdf.save(`${fileName}.pdf`);
  };

  /**
   * Descarga del gráfico en Excel
   */
  const handleDownloadExcel = (): void => {
    if (!chartRef.current) return;

    const chart = chartRef.current.getEchartsInstance();
    const option = chart.getOption();

    // Sacamos los datos de las series
    const xAxisData = option.xAxis[0].data;
    const seriesData = option.series.map((s: any) => ({
      name: s.name,
      data: s.data,
    })) as SeriesData[];

    // Creamos un Excel con ExcelJS
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Datos del Gráfico");

    // Agregamos título y período
    worksheet.addRow([fileName]);
    worksheet.getRow(1).font = { bold: true, size: 16 };
    worksheet.getRow(1).height = 24;

    // Agregamos info del período y año
    worksheet.addRow([
      `Período: ${getPeriodLabel()}${year ? ` - Año: ${year}` : ""}`,
    ]);
    worksheet.getRow(2).font = { bold: true, size: 12 };
    worksheet.getRow(2).height = 20;

    // Fila vacía para separar
    worksheet.addRow([]);

    // Agregamos los encabezados
    const headers = ["Período"];
    seriesData.forEach((series) => {
      headers.push(series.name);
    });
    worksheet.addRow(headers);

    // Formateamos los encabezados en negrita
    worksheet.getRow(4).font = { bold: true };

    // Agregamos todos los datos
    xAxisData.forEach((label: string, index: number) => {
      const row = [label];
      seriesData.forEach((series) => {
        row.push(series.data[index].toString());
      });
      worksheet.addRow(row);
    });

    // Ajustamos el ancho de las columnas automáticamente
    worksheet.columns.forEach((column) => {
      if (!column) return;

      let maxLength = 0;
      column?.eachCell?.({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });

      if (column) {
        column.width = maxLength < 10 ? 10 : maxLength + 2;
      }
    });

    // Unimos celdas para el título y la info del período
    worksheet.mergeCells("A1:C1");
    worksheet.mergeCells("A2:C2");

    // Generamos el archivo Excel y lo descargamos
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.xlsx`;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Dropdown isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="bordered"
          color="primary"
          className="border-1"
        >
          <DownloadIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Opciones de descarga">
        <DropdownItem
          key="pdf"
          aria-label="Descargar PDF"
          startContent={<PDFIcon className="text-xl" />}
          onPress={handleDownloadPDF}
          className="py-2"
        >
          PDF
        </DropdownItem>
        <DropdownItem
          key="excel"
          aria-label="Descargar Excel"
          startContent={<ExcelIcon className="text-xl" />}
          onPress={handleDownloadExcel}
          className="py-2"
        >
          Excel
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
