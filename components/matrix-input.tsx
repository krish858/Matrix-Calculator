"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Matrix } from "@/lib/matrix-utils";
import { Plus, Minus } from "lucide-react";

interface MatrixInputProps {
  value: Matrix;
  onChange: (matrix: Matrix) => void;
}

export default function MatrixInput({ value, onChange }: MatrixInputProps) {
  const updateCell = (rowIndex: number, colIndex: number, newValue: string) => {
    const newMatrix = value.map((row, i) =>
      row.map((cell, j) =>
        i === rowIndex && j === colIndex ? Number(newValue) || 0 : cell
      )
    );
    onChange(newMatrix);
  };

  const addRow = () => {
    const newRow = new Array(value[0].length).fill(0);
    onChange([...value, newRow]);
  };

  const removeRow = () => {
    if (value.length > 1) {
      onChange(value.slice(0, -1));
    }
  };

  const addColumn = () => {
    onChange(value.map((row) => [...row, 0]));
  };

  const removeColumn = () => {
    if (value[0].length > 1) {
      onChange(value.map((row) => row.slice(0, -1)));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400">Rows</span>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={removeRow}
              disabled={value.length <= 1}
              className="h-8 w-8 bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
              title="Remove row"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={addRow}
              className="h-8 w-8 bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
              title="Add row"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400">Columns</span>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={removeColumn}
              disabled={value[0].length <= 1}
              className="h-8 w-8 bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
              title="Remove column"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={addColumn}
              className="h-8 w-8 bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
              title="Add column"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <table className="w-full">
          <tbody>
            {value.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="p-1">
                    <Input
                      type="number"
                      value={cell}
                      onChange={(e) => updateCell(i, j, e.target.value)}
                      className="w-full text-center bg-gray-900 border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-sm text-gray-400 text-center">
        Size: {value.length} × {value[0].length}
      </div>
    </div>
  );
}
