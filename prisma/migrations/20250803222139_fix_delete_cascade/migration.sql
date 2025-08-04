-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exemplar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Exemplar_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Exemplar" ("available", "bookId", "id") SELECT "available", "bookId", "id" FROM "Exemplar";
DROP TABLE "Exemplar";
ALTER TABLE "new_Exemplar" RENAME TO "Exemplar";
CREATE TABLE "new_Loan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "exemplarId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "loanedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" DATETIME,
    CONSTRAINT "Loan_exemplarId_fkey" FOREIGN KEY ("exemplarId") REFERENCES "Exemplar" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Loan" ("exemplarId", "id", "loanedAt", "returnedAt", "userId") SELECT "exemplarId", "id", "loanedAt", "returnedAt", "userId" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
