-- CreateTable
CREATE TABLE "Composition" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "genre" VARCHAR(30) NOT NULL,

    CONSTRAINT "Composition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "link" VARCHAR(255),

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Composition" ADD CONSTRAINT "Composition_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
