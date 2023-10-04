-- CreateTable
CREATE TABLE "Post" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "body" STRING NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
