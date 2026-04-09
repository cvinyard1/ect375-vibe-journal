"use client";

import { useState, useEffect } from "react";
import { Material } from "@/lib/types";

interface MaterialFormProps {
  initialData?: Material;
  onSubmit: (data: Partial<Material>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function MaterialForm({
  initialData,
  onSubmit,
  isLoading,
  error,
}: MaterialFormProps) {
  const [partNumber, setPartNumber] = useState(initialData?.part_number || "");
  const [materialName, setMaterialName] = useState(initialData?.material_name || "");
  const [quantityOrdered, setQuantityOrdered] = useState(
    initialData?.quantity_ordered?.toString() || "0"
  );
  const [quantityReceived, setQuantityReceived] = useState(
    initialData?.quantity_received?.toString() || "0"
  );
  const [quantityNeeded, setQuantityNeeded] = useState(
    initialData?.quantity_needed?.toString() || "0"
  );
  const [status, setStatus] = useState(initialData?.status || "needed");
  const [unitPrice, setUnitPrice] = useState(
    initialData?.unit_price?.toString() || ""
  );
  const [notes, setNotes] = useState(initialData?.notes || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: Partial<Material> = {
      part_number: partNumber,
      material_name: materialName,
      quantity_ordered: parseInt(quantityOrdered) || 0,
      quantity_received: parseInt(quantityReceived) || 0,
      quantity_needed: parseInt(quantityNeeded) || 0,
      status: status as "ordered" | "received" | "needed",
      unit_price: unitPrice ? parseFloat(unitPrice) : null,
      notes: notes || null,
    };

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="partNumber" className="block text-sm font-medium text-slate-300 mb-2">
            Part Number *
          </label>
          <input
            id="partNumber"
            type="text"
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
            required
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="e.g., 12345-RX"
          />
        </div>

        <div>
          <label htmlFor="materialName" className="block text-sm font-medium text-slate-300 mb-2">
            Material Name *
          </label>
          <input
            id="materialName"
            type="text"
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
            required
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="e.g., Steel Beam 4x6"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="quantityOrdered" className="block text-sm font-medium text-slate-300 mb-2">
            Quantity Ordered
          </label>
          <input
            id="quantityOrdered"
            type="number"
            min="0"
            value={quantityOrdered}
            onChange={(e) => setQuantityOrdered(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label htmlFor="quantityReceived" className="block text-sm font-medium text-slate-300 mb-2">
            Quantity Received
          </label>
          <input
            id="quantityReceived"
            type="number"
            min="0"
            value={quantityReceived}
            onChange={(e) => setQuantityReceived(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label htmlFor="quantityNeeded" className="block text-sm font-medium text-slate-300 mb-2">
            Quantity Needed
          </label>
          <input
            id="quantityNeeded"
            type="number"
            min="0"
            value={quantityNeeded}
            onChange={(e) => setQuantityNeeded(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-2">
            Status *
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "ordered" | "received" | "needed")}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="needed">Needed</option>
            <option value="ordered">Ordered</option>
            <option value="received">Received</option>
          </select>
        </div>

        <div>
          <label htmlFor="unitPrice" className="block text-sm font-medium text-slate-300 mb-2">
            Unit Price
          </label>
          <input
            id="unitPrice"
            type="number"
            step="0.01"
            min="0"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="e.g., 99.99"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-2">
          Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Add any notes about this material..."
        />
      </div>

      {error && (
        <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold rounded-lg transition"
      >
        {isLoading ? "Saving..." : "Save Material"}
      </button>
    </form>
  );
}
