import React, { useState } from "react";
import { FileBox, Plus, Trash2, Download, Printer } from "lucide-react";
import jsPDF from "jspdf";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export function InvoiceTool() {
  const [clientName, setClientName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "Service Fee", quantity: 1, price: 100 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("INVOICE", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.text(`Invoice #: ${invoiceNumber}`, 20, 40);
    doc.text(`Client: ${clientName}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);

    let y = 80;
    doc.text("Description", 20, y);
    doc.text("Qty", 120, y);
    doc.text("Price", 150, y);
    doc.text("Total", 180, y);
    
    doc.line(20, y + 2, 190, y + 2);
    y += 10;

    items.forEach(item => {
      doc.text(item.description, 20, y);
      doc.text(item.quantity.toString(), 120, y);
      doc.text(`$${item.price}`, 150, y);
      doc.text(`$${item.quantity * item.price}`, 180, y);
      y += 10;
    });

    doc.line(20, y, 190, y);
    doc.setFontSize(14);
    doc.text(`Total Amount: $${total}`, 180, y + 10, { align: "right" });

    doc.save(`invoice-${invoiceNumber}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Client Name</label>
          <input 
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Acme Corp"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-600/20"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Invoice Number</label>
          <input 
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-600/20"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4 text-[10px] uppercase tracking-widest font-bold opacity-40 px-4">
          <div className="col-span-6">Description</div>
          <div className="col-span-2">Qty</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2"></div>
        </div>

        {items.map(item => (
          <div key={item.id} className="grid grid-cols-12 gap-4 items-center bg-white border border-gray-100 p-2 rounded-2xl shadow-sm">
            <div className="col-span-6">
              <input 
                type="text"
                value={item.description}
                onChange={(e) => updateItem(item.id, "description", e.target.value)}
                placeholder="Service description"
                className="w-full bg-transparent border-none px-2 py-2 text-sm outline-none"
              />
            </div>
            <div className="col-span-2">
              <input 
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                className="w-full bg-transparent border-none px-2 py-2 text-sm outline-none"
              />
            </div>
            <div className="col-span-2">
              <input 
                type="number"
                value={item.price}
                onChange={(e) => updateItem(item.id, "price", parseInt(e.target.value) || 0)}
                className="w-full bg-transparent border-none px-2 py-2 text-sm outline-none"
              />
            </div>
            <div className="col-span-2 flex justify-end pr-2">
              <button onClick={() => removeItem(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-400 hover:border-orange-600 hover:text-orange-600 transition-all flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div className="text-2xl font-bold">Total: ${total}</div>
        <div className="flex gap-4">
          <button onClick={generatePDF} className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all flex items-center gap-2 shadow-lg shadow-orange-600/20">
            <Download className="w-5 h-5" /> Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
