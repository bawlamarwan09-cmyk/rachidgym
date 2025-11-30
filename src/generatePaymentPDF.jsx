import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePaymentPDF = async (member, amount) => {
  const doc = new jsPDF();

  // Logo
  const logo = new Image();
  logo.src = "https://ik.imagekit.io/latsqiyxk/logo.jpg";
  await new Promise((resolve) => (logo.onload = resolve));
  doc.addImage(logo, "JPEG", 15, 10, 30, 30);

  doc.setFontSize(18);
  doc.text("RACHID GYM", 105, 20, { align: "center" });

  doc.setFontSize(14);
  doc.text("Payment Receipt", 105, 28, { align: "center" });

  doc.autoTable({
    startY: 40,
    head: [["Field", "Value"]],
    body: [
      ["CIN", member.cin],
      ["Name", member.name],
      ["Sport", member.sport_name],
      ["Amount Paid", amount + " DH"],
      ["Date", new Date().toLocaleString()],
    ]
  });

  const fileName = `payment_${member.cin}_${Date.now()}.pdf`;
  doc.save(fileName);

  return fileName;
};
