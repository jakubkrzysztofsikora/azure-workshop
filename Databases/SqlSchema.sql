USE [series]
GO
/****** Object:  Table [dbo].[Hashtags]    Script Date: 10.02.2018 20:39:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Hashtags](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[HashTag] [varchar](100) NOT NULL,
	[LastTweetId] [varchar](100) NULL,
	[SeriesId] [int] NULL,
	[RowVersion] [timestamp] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[Series]    Script Date: 10.02.2018 20:39:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Series](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Rating] [decimal](18, 2) NOT NULL,
	[VotesCount] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
ALTER TABLE [dbo].[Series] ADD  DEFAULT ((0)) FOR [Rating]
GO
ALTER TABLE [dbo].[Series] ADD  DEFAULT ((0)) FOR [VotesCount]
GO
ALTER TABLE [dbo].[Hashtags]  WITH CHECK ADD FOREIGN KEY([SeriesId])
REFERENCES [dbo].[Series] ([Id])
GO