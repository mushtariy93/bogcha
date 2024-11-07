-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "description" TEXT,
    "confirmPassword" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isCreator" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "child" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parent" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passportInfo" TEXT NOT NULL,
    "workplace" TEXT,
    "roleId" INTEGER NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "hashedRefreshToken" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "childParent" (
    "id" SERIAL NOT NULL,
    "childId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "childParent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roleParent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roleParent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "childId" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "is_paid" BOOLEAN NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "is_active" BOOLEAN DEFAULT false,
    "hashed_refresh_token" TEXT,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff_role" (
    "staffId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "staff_role_pkey" PRIMARY KEY ("staffId","roleId")
);

-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "gruop_name" TEXT NOT NULL,
    "age_range" TEXT NOT NULL,
    "max_capacity" TEXT NOT NULL,
    "building_number" TEXT NOT NULL,
    "room_number" TEXT NOT NULL,
    "room_floor" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_staff" (
    "staffId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "group_staff_pkey" PRIMARY KEY ("staffId","groupId")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    "activity" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendanceGroup" (
    "id" SERIAL NOT NULL,
    "childId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "cheak_in_time" TEXT NOT NULL,
    "cheak_up_time" TEXT NOT NULL,

    CONSTRAINT "attendanceGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "titel" TEXT NOT NULL,
    "desciption" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "childParent_childId_parentId_key" ON "childParent"("childId", "parentId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "staff_login_key" ON "staff"("login");

-- CreateIndex
CREATE UNIQUE INDEX "group_gruop_name_key" ON "group"("gruop_name");

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent" ADD CONSTRAINT "parent_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roleParent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "childParent" ADD CONSTRAINT "childParent_childId_fkey" FOREIGN KEY ("childId") REFERENCES "child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "childParent" ADD CONSTRAINT "childParent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_childId_fkey" FOREIGN KEY ("childId") REFERENCES "child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_role" ADD CONSTRAINT "staff_role_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_role" ADD CONSTRAINT "staff_role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_staff" ADD CONSTRAINT "group_staff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_staff" ADD CONSTRAINT "group_staff_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendanceGroup" ADD CONSTRAINT "attendanceGroup_childId_fkey" FOREIGN KEY ("childId") REFERENCES "child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendanceGroup" ADD CONSTRAINT "attendanceGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
