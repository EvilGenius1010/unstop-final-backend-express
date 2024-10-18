-- CreateTable
CREATE TABLE "User" (
    "phone_no" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("phone_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_no_key" ON "User"("phone_no");
