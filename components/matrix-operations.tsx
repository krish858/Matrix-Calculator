"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Matrix,
  addMatrices,
  multiplyMatrices,
  subtractMatrices,
  calculateDeterminant,
  transposeMatrix,
  skewMatrix,
  rotateMatrix,
} from "@/lib/matrix-utils";

interface MatrixOperationsProps {
  matrixA: Matrix;
  matrixB: Matrix;
  operation: string;
  onOperationChange: (operation: string) => void;
  onResult: (result: Matrix | null) => void;
}

export default function MatrixOperations({
  matrixA,
  matrixB,
  operation,
  onOperationChange,
  onResult,
}: MatrixOperationsProps) {
  const [angle, setAngle] = useState<number>(45);
  const [skewDirection, setSkewDirection] = useState<"x" | "y">("x");
  const [determinantResult, setDeterminantResult] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const validateOperation = () => {
    setError(null);

    switch (operation) {
      case "add":
      case "subtract":
        if (
          matrixA.length !== matrixB.length ||
          matrixA[0].length !== matrixB[0].length
        ) {
          throw new Error(
            "Matrices must have the same dimensions for addition/subtraction"
          );
        }
        break;
      case "multiply":
        if (matrixA[0].length !== matrixB.length) {
          throw new Error(
            `Cannot multiply matrices: first matrix columns (${matrixA[0].length}) must equal second matrix rows (${matrixB.length})`
          );
        }
        break;
      case "determinant":
        if (matrixA.length !== matrixA[0].length) {
          throw new Error("Matrix must be square to calculate determinant");
        }
        break;
    }
  };

  const calculateResult = () => {
    try {
      validateOperation();

      switch (operation) {
        case "add":
          onResult(addMatrices(matrixA, matrixB));
          setDeterminantResult(null);
          break;
        case "subtract":
          onResult(subtractMatrices(matrixA, matrixB));
          setDeterminantResult(null);
          break;
        case "multiply":
          onResult(multiplyMatrices(matrixA, matrixB));
          setDeterminantResult(null);
          break;
        case "determinant":
          const det = calculateDeterminant(matrixA);
          setDeterminantResult(det);
          onResult(null);
          break;
        case "transpose":
          onResult(transposeMatrix(matrixA));
          setDeterminantResult(null);
          break;
        case "skew":
          onResult(skewMatrix(matrixA, angle, skewDirection));
          setDeterminantResult(null);
          break;
        case "rotate":
          onResult(rotateMatrix(matrixA, angle));
          setDeterminantResult(null);
          break;
        default:
          onResult(null);
          setDeterminantResult(null);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      onResult(null);
      setDeterminantResult(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center justify-center flex-wrap">
        <Select
          value={operation}
          onValueChange={(value) => {
            onOperationChange(value);
            setError(null);
          }}
        >
          <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
            <SelectItem value="add">Add</SelectItem>
            <SelectItem value="subtract">Subtract</SelectItem>
            <SelectItem value="multiply">Multiply</SelectItem>
            <SelectItem value="determinant">Determinant</SelectItem>
            <SelectItem value="transpose">Transpose</SelectItem>
            <SelectItem value="skew">Skew</SelectItem>
            <SelectItem value="rotate">Rotate</SelectItem>
          </SelectContent>
        </Select>

        {(operation === "skew" || operation === "rotate") && (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-20 bg-gray-800 border-gray-700 text-gray-200"
              placeholder="Angle"
            />
            {operation === "skew" && (
              <Select
                value={skewDirection}
                onValueChange={(value: "x" | "y") => setSkewDirection(value)}
              >
                <SelectTrigger className="w-20 bg-gray-800 border-gray-700 text-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <SelectItem value="x">X</SelectItem>
                  <SelectItem value="y">Y</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        )}

        <Button
          onClick={calculateResult}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Calculate
        </Button>
      </div>

      {error && (
        <div className="text-center text-red-400 bg-red-900/20 p-3 rounded-md border border-red-800">
          {error}
        </div>
      )}

      {determinantResult !== null && (
        <div className="text-center text-lg bg-blue-900/20 p-4 rounded-md border border-blue-800">
          Determinant:{" "}
          <span className="font-bold text-blue-400">
            {determinantResult.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
