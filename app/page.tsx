"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import MatrixInput from "@/components/matrix-input";
import MatrixOperations from "@/components/matrix-operations";
import { Matrix } from "@/lib/matrix-utils";

export default function Home() {
  const [matrixA, setMatrixA] = useState<Matrix>([
    [1, 2],
    [3, 4],
  ]);
  const [matrixB, setMatrixB] = useState<Matrix>([
    [1, 0],
    [0, 1],
  ]);
  const [result, setResult] = useState<Matrix | null>(null);
  const [operation, setOperation] = useState<string>("add");

  return (
    <main className="min-h-screen bg-black text-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="bg-gray-800 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
            <Calculator className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Advanced Matrix Calculator
          </h1>
          <p className="text-gray-400">
            Perform advanced mathematical operations on matrices
          </p>
          <div className="border-t border-gray-800 max-w-md mx-auto pt-2">
            <p className="text-sm text-gray-500">
              Use the + and - buttons to adjust matrix dimensions
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold text-blue-400">Matrix A</h2>
            <MatrixInput value={matrixA} onChange={setMatrixA} />
          </div>
          <div className="space-y-4 bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold text-blue-400">Matrix B</h2>
            <MatrixInput value={matrixB} onChange={setMatrixB} />
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <MatrixOperations
            matrixA={matrixA}
            matrixB={matrixB}
            onResult={setResult}
            operation={operation}
            onOperationChange={setOperation}
          />
        </div>

        {result && (
          <div className="space-y-4 bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold text-blue-400">Result</h2>
            <div className="bg-gray-800 p-6 rounded-lg">
              <table className="w-full">
                <tbody>
                  {result.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="text-center p-2 border border-gray-700 bg-gray-900"
                        >
                          {cell.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
