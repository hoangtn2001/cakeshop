USE [master]
GO
/****** Object:  Database [CakeShop]    Script Date: 14/08/2023 9:51:37 CH ******/
CREATE DATABASE [CakeShop]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CakeShop', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SERVER4\MSSQL\DATA\CakeShop.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'CakeShop_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SERVER4\MSSQL\DATA\CakeShop_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [CakeShop] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CakeShop].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CakeShop] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CakeShop] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CakeShop] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CakeShop] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CakeShop] SET ARITHABORT OFF 
GO
ALTER DATABASE [CakeShop] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CakeShop] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CakeShop] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CakeShop] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CakeShop] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CakeShop] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CakeShop] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CakeShop] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CakeShop] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CakeShop] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CakeShop] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CakeShop] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CakeShop] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CakeShop] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CakeShop] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CakeShop] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CakeShop] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CakeShop] SET RECOVERY FULL 
GO
ALTER DATABASE [CakeShop] SET  MULTI_USER 
GO
ALTER DATABASE [CakeShop] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CakeShop] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CakeShop] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CakeShop] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [CakeShop] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'CakeShop', N'ON'
GO
USE [CakeShop]
GO
/****** Object:  Table [dbo].[Bill]    Script Date: 14/08/2023 9:51:37 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bill](
	[Id_bill] [int] IDENTITY(1,1) NOT NULL,
	[Id_cart] [int] NULL,
	[Pay] [int] NULL,
	[Date] [datetime] NULL,
	[Phone_number_dely] [nvarchar](50) NULL,
	[Address_dely] [nchar](200) NULL,
 CONSTRAINT [PK_Bills] PRIMARY KEY CLUSTERED 
(
	[Id_bill] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Cart]    Script Date: 14/08/2023 9:51:37 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cart](
	[Id_cart] [int] IDENTITY(1,1) NOT NULL,
	[Id_user] [int] NULL,
	[State_cart] [int] NULL,
 CONSTRAINT [PK_Cart] PRIMARY KEY CLUSTERED 
(
	[Id_cart] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Cart_detail]    Script Date: 14/08/2023 9:51:37 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cart_detail](
	[Id_cart_detail] [int] IDENTITY(1,1) NOT NULL,
	[Id_cart] [int] NULL,
	[Id_product] [int] NULL,
	[Quantity] [int] NULL,
	[Cd_date] [datetime] NULL,
 CONSTRAINT [PK_Cart_detail] PRIMARY KEY CLUSTERED 
(
	[Id_cart_detail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Category]    Script Date: 14/08/2023 9:51:37 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[Id_category] [int] IDENTITY(1,1) NOT NULL,
	[Name_category] [nvarchar](50) NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[Id_category] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 14/08/2023 9:51:37 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback](
	[Id_feed] [int] IDENTITY(1,1) NOT NULL,
	[Id_user] [int] NULL,
	[Comment] [nvarchar](500) NULL,
	[Date] [date] NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[Id_feed] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Product]    Script Date: 14/08/2023 9:51:37 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[Id_product] [int] IDENTITY(1,1) NOT NULL,
	[Id_category] [int] NULL,
	[Quantity_pro] [int] NULL,
	[Name_product] [nvarchar](100) NULL,
	[Describe] [nvarchar](400) NULL,
	[Price] [int] NULL,
	[Link_image] [nvarchar](400) NULL,
	[Fe_pro] [int] NULL,
	[Pro_state] [int] NULL,
	[Quantity_pro_bought] [int] NULL,
 CONSTRAINT [PK_Table_1] PRIMARY KEY CLUSTERED 
(
	[Id_product] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Role]    Script Date: 14/08/2023 9:51:37 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[Id_role] [int] IDENTITY(1,1) NOT NULL,
	[Service] [nvarchar](50) NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[Id_role] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Token]    Script Date: 14/08/2023 9:51:37 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Token](
	[Id_token] [int] IDENTITY(1,1) NOT NULL,
	[Id_user] [int] NULL,
	[Token] [nvarchar](400) NULL,
 CONSTRAINT [PK_Token] PRIMARY KEY CLUSTERED 
(
	[Id_token] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Userr]    Script Date: 14/08/2023 9:51:37 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Userr](
	[Id_user] [int] IDENTITY(1,1) NOT NULL,
	[Id_role] [int] NULL,
	[Address] [nvarchar](200) NULL,
	[Email] [nvarchar](100) NULL,
	[Password] [nvarchar](200) NULL,
	[Name_user] [nvarchar](100) NULL,
	[Sex] [int] NULL,
	[Phone_number] [nvarchar](50) NULL,
	[State_user] [int] NULL,
 CONSTRAINT [PK_Userr] PRIMARY KEY CLUSTERED 
(
	[Id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Bill] ON 

INSERT [dbo].[Bill] ([Id_bill], [Id_cart], [Pay], [Date], [Phone_number_dely], [Address_dely]) VALUES (1, 2068, 250000, CAST(N'2023-07-26 10:29:29.353' AS DateTime), N'97, man Thiện ', NULL)
INSERT [dbo].[Bill] ([Id_bill], [Id_cart], [Pay], [Date], [Phone_number_dely], [Address_dely]) VALUES (2, 2069, 650000, CAST(N'2023-07-26 10:34:03.940' AS DateTime), N'97, man Thiện ', NULL)
INSERT [dbo].[Bill] ([Id_bill], [Id_cart], [Pay], [Date], [Phone_number_dely], [Address_dely]) VALUES (3, 2070, 400000, CAST(N'2023-07-26 16:06:25.097' AS DateTime), N'0353739060', N'97, man Thiện                                                                                                                                                                                           ')
INSERT [dbo].[Bill] ([Id_bill], [Id_cart], [Pay], [Date], [Phone_number_dely], [Address_dely]) VALUES (4, 2071, 40000, CAST(N'2023-08-13 23:32:38.060' AS DateTime), N'0353739060', N'97, man Thiện                                                                                                                                                                                           ')
SET IDENTITY_INSERT [dbo].[Bill] OFF
SET IDENTITY_INSERT [dbo].[Cart] ON 

INSERT [dbo].[Cart] ([Id_cart], [Id_user], [State_cart]) VALUES (2068, 7, 4)
INSERT [dbo].[Cart] ([Id_cart], [Id_user], [State_cart]) VALUES (2069, 7, 1)
INSERT [dbo].[Cart] ([Id_cart], [Id_user], [State_cart]) VALUES (2070, 7, 1)
INSERT [dbo].[Cart] ([Id_cart], [Id_user], [State_cart]) VALUES (2071, 7, 1)
SET IDENTITY_INSERT [dbo].[Cart] OFF
SET IDENTITY_INSERT [dbo].[Cart_detail] ON 

INSERT [dbo].[Cart_detail] ([Id_cart_detail], [Id_cart], [Id_product], [Quantity], [Cd_date]) VALUES (6, 2068, 46, 1, CAST(N'2023-07-25 23:34:33.950' AS DateTime))
INSERT [dbo].[Cart_detail] ([Id_cart_detail], [Id_cart], [Id_product], [Quantity], [Cd_date]) VALUES (9, 2069, 46, 2, CAST(N'2023-07-26 10:33:48.187' AS DateTime))
INSERT [dbo].[Cart_detail] ([Id_cart_detail], [Id_cart], [Id_product], [Quantity], [Cd_date]) VALUES (10, 2069, 40, 1, CAST(N'2023-07-26 10:33:55.070' AS DateTime))
INSERT [dbo].[Cart_detail] ([Id_cart_detail], [Id_cart], [Id_product], [Quantity], [Cd_date]) VALUES (13, 2070, 42, 2, CAST(N'2023-07-26 16:06:19.637' AS DateTime))
INSERT [dbo].[Cart_detail] ([Id_cart_detail], [Id_cart], [Id_product], [Quantity], [Cd_date]) VALUES (16, 2071, 41, 2, CAST(N'2023-08-13 23:31:05.853' AS DateTime))
SET IDENTITY_INSERT [dbo].[Cart_detail] OFF
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([Id_category], [Name_category]) VALUES (14, N'Bánh kem ')
INSERT [dbo].[Category] ([Id_category], [Name_category]) VALUES (15, N'Bánh mì ')
INSERT [dbo].[Category] ([Id_category], [Name_category]) VALUES (16, N'Bánh Crepe')
INSERT [dbo].[Category] ([Id_category], [Name_category]) VALUES (17, N'Bánh bao')
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[Feedback] ON 

INSERT [dbo].[Feedback] ([Id_feed], [Id_user], [Comment], [Date]) VALUES (23, 7, N'em mong bài này đủ với tinh thần của môn học', CAST(N'2023-06-06' AS Date))
INSERT [dbo].[Feedback] ([Id_feed], [Id_user], [Comment], [Date]) VALUES (24, 7, N'gần hoàn thiện', CAST(N'2023-07-28' AS Date))
SET IDENTITY_INSERT [dbo].[Feedback] OFF
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (40, 14, 5, N'bánh sầu riêng', N'Bánh kem sữa vị cam tươi, thơm ngon đậm vị', 150000, N'/public/uploads/1688140240394-hoagtrinhdev-crepenha.jpg', 1, 0, 1)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (41, 17, 5, N'Bánh nhân đậu', N'Bánh bao nhân đậu thập cẩm, thơm ngon bổ dưỡng', 20000, N'/public/uploads/1685503625045-hoagtrinhdev-banhbaodau.jpg', 1, 0, 2)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (42, 14, 5, N'Bánh chanh leo', N'Nhân chanh leo, chua chua, ngọt ngọt', 200000, N'/public/uploads/1685505803696-hoagtrinhdev-chanhleo.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (43, 15, 5, N'Bánh bơ tỏi', N'bánh mì giòn kết hợp mùi hương bơ tỏi nướng thơm lừng', 40000, N'/public/uploads/1685503790181-hoagtrinhdev-banhmibotoi.jpg', 1, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (44, 17, 5, N'Bánh bao  dừa', N'nhân dừa ngọt thơm, vỏ bánh lá dứa dậy mùi', 20000, N'/public/uploads/1685507100576-hoagtrinhdev-suadua.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (45, 14, 5, N'Bánh kem dâu', N'bánh hương dâu, thơm ngon ngọt ngào', 250000, N'/public/uploads/1685503954030-hoagtrinhdev-banhkemvidau.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (46, 14, 5, N'Bánh sữa dâu', N'nhân sữa dâu', 250000, N'/public/uploads/1685504004719-hoagtrinhdev-banhkemdautuoi.jpg', 0, 0, 2)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (47, 17, 5, N'Bánh kim sa', N'nhân kim sa trứng chảy', 30000, N'/public/uploads/1685506932402-hoagtrinhdev-kimsa.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (50, 15, 5, N'Bánh phô mai', N'nhân phô mai', 60000, N'/public/uploads/1685507428838-hoagtrinhdev-miphomai.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (51, 14, 5, N'Bánh kem bắp', N'nhân bắp', 250000, N'/public/uploads/1685507505952-hoagtrinhdev-bap.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (52, 15, 5, N'Bánh kem tươi', N'nhân kem', 20000, N'/public/uploads/1685504284156-hoagtrinhdev-banhmikemtuoi.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (53, 15, 5, N'Bánh mexico', N'nhân sô cô la', 25000, N'/public/uploads/1685507444609-hoagtrinhdev-mexico.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (54, 16, 5, N'Crepe ngàn lớp', N'nhân kem, sầu riêng', 150000, N'/public/uploads/1685507413764-hoagtrinhdev-crepenha.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (55, 17, 5, N'Bánh xá xíu', N'nhân xá xíu', 40000, N'/public/uploads/1685504453040-hoagtrinhdev-banhbaoxaxiu.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (56, 17, 5, N' xá xíu chesse', N'nhân xá xíu phô mai', 45000, N'/public/uploads/1685505770177-hoagtrinhdev-phomaixaxiu.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (57, 14, 5, N'Bánh mini', N'nhỏ, xinh, ngon', 50000, N'/public/uploads/1685504525551-hoagtrinhdev-banhkemmini.jpg', 1, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (58, 14, 5, N'Bánh socola', N'nhân sô cô la', 250000, N'/public/uploads/1685504591148-hoagtrinhdev-banhkemvisocola.jpg', 1, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (59, 15, 5, N'Bánh hoa cúc', N'thơm ngon ', 35000, N'/public/uploads/1685504638604-hoagtrinhdev-banhmihoacup.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (60, 14, 5, N'Bánh k phô mai', N'vị phô mai', 250000, N'/public/uploads/1685504682593-hoagtrinhdev-banhkemviphomai.jpg', 1, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (61, 16, 5, N'Crepe sầu riêng', N'nhân sầu riêng', 40000, N'/public/uploads/1685504720915-hoagtrinhdev-crepesaurien.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (62, 15, 5, N'Bánh mì sữa', N'thơm sữa, béo ngọt', 18000, N'/public/uploads/1685504756637-hoagtrinhdev-banhmisua.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (63, 16, 5, N'Crepe sữa', N'nhân sữa', 200000, N'/public/uploads/1685504839531-hoagtrinhdev-crepesua.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (64, 16, 5, N'Crepe chuối', N'nhân chuối', 50000, N'/public/uploads/1685504870620-hoagtrinhdev-crepechuoi.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (65, 17, 5, N'Bánh trứng muối', N'nhân trứng muối', 35000, N'/public/uploads/1685504923880-hoagtrinhdev-cacbanhbaotrungmuoi.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (66, 14, 5, N'Bánh trái cây', N'vị trái cây', 300000, N'/public/uploads/1685504951715-hoagtrinhdev-banhkemvitraicay.jpg', 1, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (67, 15, 5, N'Bánh mì sôcôla', N'vị sô cô la', 80000, N'/public/uploads/1685504995091-hoagtrinhdev-banhmisocola.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (68, 14, 5, N'Bánh kem kiwi', N'vị kiwi', 250000, N'/public/uploads/1685507456854-hoagtrinhdev-kiwwi.jpg', 0, 0, 0)
INSERT [dbo].[Product] ([Id_product], [Id_category], [Quantity_pro], [Name_product], [Describe], [Price], [Link_image], [Fe_pro], [Pro_state], [Quantity_pro_bought]) VALUES (69, 16, 5, N'Crepe dâu', N'nhân dâu', 35000, N'/public/uploads/1685505048880-hoagtrinhdev-crepedau.jpg', 0, 0, 0)
SET IDENTITY_INSERT [dbo].[Product] OFF
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([Id_role], [Service]) VALUES (1, N'Admin')
INSERT [dbo].[Role] ([Id_role], [Service]) VALUES (2, N'User')
SET IDENTITY_INSERT [dbo].[Role] OFF
SET IDENTITY_INSERT [dbo].[Token] ON 

INSERT [dbo].[Token] ([Id_token], [Id_user], [Token]) VALUES (399, 8, N'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaXNBZG1pbiI6InRyaW5obmFtMDExYUBnbWFpbC5jb20iLCJuYW1lIjoiVHLhu4tuaCBWxINuIE5hbSIsImlhdCI6MTY5MTk0NDkzMywiZXhwIjoxNzIzNDgwOTMzfQ.7Dt54Hqc63Gqc_YxqM09KihXs6bhCye_z_6KYSUgs38')
SET IDENTITY_INSERT [dbo].[Token] OFF
SET IDENTITY_INSERT [dbo].[Userr] ON 

INSERT [dbo].[Userr] ([Id_user], [Id_role], [Address], [Email], [Password], [Name_user], [Sex], [Phone_number], [State_user]) VALUES (7, 2, N'97, man Thiện ', N'N19DCCN066@student.ptithcm.edu.vn', N'$2b$10$X2qPO6oidc9Sklh4sGc6MOp923W0S6EiXQM6iIbEARxZLNziNjyD6', N'Trịnh Ngọc Hoàng', 0, N'0353739060', 0)
INSERT [dbo].[Userr] ([Id_user], [Id_role], [Address], [Email], [Password], [Name_user], [Sex], [Phone_number], [State_user]) VALUES (8, 1, N'11, Thống Nhất', N'trinhnam011a@gmail.com', N'$2b$10$J97k3uRszkOLBn0ZZwQ3Q.5KCD1EOYqO3cJF1EXMsoxUBJdZuZHCO', N'Trịnh Văn Nam', 0, N'05000612815', 0)
INSERT [dbo].[Userr] ([Id_user], [Id_role], [Address], [Email], [Password], [Name_user], [Sex], [Phone_number], [State_user]) VALUES (12, 2, N'101 man thiện', N'bachnhan011a3@gmail.com', N'$2b$10$hcrv32/Pedeq7MRp3zL9KO0ElPcRJulK97.gQgfUIQSnop7Hba.HG', N'Trần Tâm', 0, N'03270805396', 0)
INSERT [dbo].[Userr] ([Id_user], [Id_role], [Address], [Email], [Password], [Name_user], [Sex], [Phone_number], [State_user]) VALUES (13, 2, N'56, man Thiện ', N'n19dccn193@student.ptithcm.edu.vn', N'$2b$10$lmg4mxvuwIbjFOZV9lH5D.mZT4Ob1KcLimbOiE1vZkBMqtWvYKQxO', N'Mai Thanh', 0, N'0323111654', 0)
SET IDENTITY_INSERT [dbo].[Userr] OFF
ALTER TABLE [dbo].[Bill]  WITH CHECK ADD  CONSTRAINT [FK_Bill_Cart] FOREIGN KEY([Id_cart])
REFERENCES [dbo].[Cart] ([Id_cart])
GO
ALTER TABLE [dbo].[Bill] CHECK CONSTRAINT [FK_Bill_Cart]
GO
ALTER TABLE [dbo].[Cart]  WITH CHECK ADD  CONSTRAINT [FK_Carts_Userr] FOREIGN KEY([Id_user])
REFERENCES [dbo].[Userr] ([Id_user])
GO
ALTER TABLE [dbo].[Cart] CHECK CONSTRAINT [FK_Carts_Userr]
GO
ALTER TABLE [dbo].[Cart_detail]  WITH CHECK ADD  CONSTRAINT [FK_Cart_detail_Carts] FOREIGN KEY([Id_cart])
REFERENCES [dbo].[Cart] ([Id_cart])
GO
ALTER TABLE [dbo].[Cart_detail] CHECK CONSTRAINT [FK_Cart_detail_Carts]
GO
ALTER TABLE [dbo].[Cart_detail]  WITH CHECK ADD  CONSTRAINT [FK_Cart_detail_Product] FOREIGN KEY([Id_product])
REFERENCES [dbo].[Product] ([Id_product])
GO
ALTER TABLE [dbo].[Cart_detail] CHECK CONSTRAINT [FK_Cart_detail_Product]
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Userr] FOREIGN KEY([Id_user])
REFERENCES [dbo].[Userr] ([Id_user])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Feedback] CHECK CONSTRAINT [FK_Comment_Userr]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Category] FOREIGN KEY([Id_category])
REFERENCES [dbo].[Category] ([Id_category])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Category]
GO
ALTER TABLE [dbo].[Token]  WITH CHECK ADD  CONSTRAINT [FK_Token_Userr] FOREIGN KEY([Id_user])
REFERENCES [dbo].[Userr] ([Id_user])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Token] CHECK CONSTRAINT [FK_Token_Userr]
GO
ALTER TABLE [dbo].[Userr]  WITH CHECK ADD  CONSTRAINT [FK_Userr_Role] FOREIGN KEY([Id_role])
REFERENCES [dbo].[Role] ([Id_role])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Userr] CHECK CONSTRAINT [FK_Userr_Role]
GO
USE [master]
GO
ALTER DATABASE [CakeShop] SET  READ_WRITE 
GO
