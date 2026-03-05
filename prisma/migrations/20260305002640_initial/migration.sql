-- CreateEnum
CREATE TYPE "Kind" AS ENUM ('BICEPS', 'TRICPES', 'LEGS', 'CHEST', 'SHOULDER', 'BACK', 'CARDIO');

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "kind" "Kind" NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);
