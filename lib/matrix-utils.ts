export type Matrix = number[][];

export function addMatrices(a: Matrix, b: Matrix): Matrix {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error('Matrices must have the same dimensions for addition');
  }

  return a.map((row, i) =>
    row.map((cell, j) => cell + b[i][j])
  );
}

export function subtractMatrices(a: Matrix, b: Matrix): Matrix {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error('Matrices must have the same dimensions for subtraction');
  }

  return a.map((row, i) =>
    row.map((cell, j) => cell - b[i][j])
  );
}

export function multiplyMatrices(a: Matrix, b: Matrix): Matrix {
  if (a[0].length !== b.length) {
    throw new Error('Number of columns in first matrix must equal number of rows in second matrix');
  }

  const result: Matrix = Array(a.length).fill(0).map(() =>
    Array(b[0].length).fill(0)
  );

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b[0].length; j++) {
      result[i][j] = a[i].reduce((sum, cell, k) => sum + cell * b[k][j], 0);
    }
  }

  return result;
}

export function calculateDeterminant(matrix: Matrix): number {
  if (matrix.length !== matrix[0].length) {
    throw new Error('Matrix must be square to calculate determinant');
  }

  if (matrix.length === 1) {
    return matrix[0][0];
  }

  if (matrix.length === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  let determinant = 0;
  for (let j = 0; j < matrix[0].length; j++) {
    determinant += matrix[0][j] * cofactor(matrix, 0, j);
  }
  return determinant;
}

function cofactor(matrix: Matrix, row: number, col: number): number {
  return (
    Math.pow(-1, row + col) * calculateDeterminant(getMinor(matrix, row, col))
  );
}

function getMinor(matrix: Matrix, row: number, col: number): Matrix {
  return matrix
    .filter((_, index) => index !== row)
    .map(row => row.filter((_, index) => index !== col));
}

export function transposeMatrix(matrix: Matrix): Matrix {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

export function skewMatrix(matrix: Matrix, angle: number, direction: 'x' | 'y'): Matrix {
  const radians = (angle * Math.PI) / 180;
  const tan = Math.tan(radians);

  return matrix.map((row, i) => 
    row.map((cell, j) => {
      if (direction === 'x') {
        return cell + (tan * i);
      } else {
        return cell + (tan * j);
      }
    })
  );
}

export function rotateMatrix(matrix: Matrix, angle: number): Matrix {
  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  return matrix.map((row, i) =>
    row.map((_, j) => {
      const x = j - (matrix[0].length - 1) / 2;
      const y = i - (matrix.length - 1) / 2;
      const newX = x * cos - y * sin;
      const newY = x * sin + y * cos;
      return matrix[Math.round(newY + (matrix.length - 1) / 2)]?.[Math.round(newX + (matrix[0].length - 1) / 2)] || 0;
    })
  );
}