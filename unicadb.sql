-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: localhost
-- Χρόνος δημιουργίας: 10 Ιουν 2022 στις 20:57:37
-- Έκδοση διακομιστή: 10.4.19-MariaDB
-- Έκδοση PHP: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `unicadb`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `coproject`
--

CREATE TABLE `coproject` (
  `coProjectId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `coAuthorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `groups`
--

CREATE TABLE `groups` (
  `groupId` int(11) NOT NULL,
  `groupOwnerId` int(11) DEFAULT NULL,
  `groupTitle` varchar(100) NOT NULL,
  `groupDateCreated` date DEFAULT NULL,
  `groupDateUpdated` datetime DEFAULT NULL,
  `groupLocation` varchar(100) DEFAULT NULL,
  `groupMemberCounter` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Δομή πίνακα για τον πίνακα `notifications`
--

CREATE TABLE `notifications` (
  `notificationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `notificationText` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `papers`
--

CREATE TABLE `papers` (
  `paperId` int(11) NOT NULL,
  `paperOwnerId` int(11) NOT NULL,
  `paperTitle` varchar(150) NOT NULL,
  `paperDateCreated` date NOT NULL,
  `paperDateUpdated` datetime DEFAULT NULL,
  `paperPath` varchar(255) NOT NULL,
  `paperFlag` int(10) NOT NULL DEFAULT 0,
  `paperState` tinyint(1) NOT NULL DEFAULT 0,
  `paperDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `projects`
--

CREATE TABLE `projects` (
  `projectId` int(11) NOT NULL,
  `projectOwnerId` int(11) DEFAULT NULL,
  `projectTitle` varchar(150) NOT NULL,
  `projectDateCreated` datetime DEFAULT current_timestamp(),
  `projectDateUpdated` datetime DEFAULT current_timestamp(),
  `projectCategory` enum('Engineering','Fine Arts','Geometry','Informatics','Litterature','Mathematics','Mecanics','Medicin','Philosophy','Physics','Theology','Other') DEFAULT NULL,
  `projectInfo` longtext DEFAULT NULL,
  `projectAbstract` text DEFAULT NULL,
  `projectPath` varchar(255) DEFAULT NULL,
  `projectFlag` int(10) NOT NULL DEFAULT 0,
  `projectState` tinyint(1) NOT NULL DEFAULT 0,
  `projectDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Άδειασμα δεδομένων του πίνακα `projects`
--

INSERT INTO `projects` (`projectId`, `projectOwnerId`, `projectTitle`, `projectDateCreated`, `projectDateUpdated`, `projectCategory`, `projectInfo`, `projectAbstract`, `projectPath`, `projectFlag`, `projectState`, `projectDeleted`) VALUES
(204, 71, 'Math Template', '2022-05-08 23:05:48', '2022-05-08 23:05:48', 'Mathematics', '\\documentclass[12pt]{article}\n\\usepackage{amsmath}\n\\usepackage{graphicx}\n\n\\title{\\TeX live.js}\n\\author{Created by Manuel Sch\\\"olling}\n\\date{\\today}\n\\begin{document}\n  \\maketitle\n  \\TeX{}live.js is a compiler for the \\TeX{}\n  typesetting program created using Mozilla\'s Emscripten\n  Compiler. It offers programmable desktop\n  publishing features and extensive facilities for\n  automating most aspects of typesetting and desktop\n  publishing, including numbering and cross-referencing,\n  tables and figures, page layout, bibliographies, and\n  much more. It supports \\LaTeX{} which was originally written \n  in 1984 by Leslie Lamport and has become the dominant method for\n  using \\TeX;\n \n  % This is a comment, not shown in final output.\n  % The following shows typesetting power of LaTeX:\n  \\begin{align}\n    E_0 &= mc^2                              \\\\\n    E &= \\frac{mc^2}{\\sqrt{1-\\frac{v^2}{c^2}}}\n  \\end{align}\n\n\n  \\TeX{}live.js even supports images! This photo was taken by Laura Poitras/Praxis Films\n\\end{document}', 'Abstract sample text for Math-Template', NULL, 0, 1, 0),
(205, 71, 'Greek Template', '2022-05-08 23:07:10', '2022-05-08 23:07:10', 'Other', '\\documentclass[a4paper,12pt]{article}\n\n\\usepackage{setspace}\n\\setstretch{1}\n\n\\usepackage[a4paper,left=3cm, right=3cm, top=2.5cm, bottom=2.5cm]{geometry}\n\\usepackage{amsmath,amssymb}\n\\usepackage{array,graphicx}\n\\usepackage{booktabs}\n\\usepackage{pifont}\n\\usepackage{tabu}\n\\usepackage{longtable}\n\\usepackage{xcolor}\n\\usepackage{tcolorbox}\n\\usepackage{textcomp}\n\n\\usepackage[utf8]{inputenc}\n\\usepackage[greek,english]{babel}\n\n\\newcommand{\\en}{\\selectlanguage{english}}\n\\newcommand{\\gr}{\\selectlanguage{greek}}\n\n\\title{\\textbf{\\LARGE Άρθρο}\\vspace{10mm}} \n\n\\author{ \n            {ΑΘανάσιος Παρασκευόπουλος} \n            \\\\{Μεταπτυχιακός φοιτητής Μαθηματικών στο Ε.Α.Π}\n            \\\\{{\\latintext{at.paraskevopoulos@protonmail.ch}}}}\n \n\\date{}\n\n\\begin{document}\n\\gr\n\n\\maketitle\n\n\\begin{abstract}\n    \n\\end{abstract}\n\n\\selectlanguage{english}\n\\begin{center}\n\n\\title{\\textbf{\\LARGE{Article}\\vspace{10mm}}} \n\\\\\n\\author{ \n            {Athanasios Paraskevopoulos} \n            \\\\{MSc.candidate in Mathematics at Hellenic Open University}}\n\\end{center}\n\n\\begin{abstract}\n    \n\\end{abstract}\n\n\\newpage\n\\gr\n\\section{}\n\n\\newpage\n\\begin{thebibliography}{99}\n\\bibitem{}\n\n\\end{thebibliography}\n\\end{document}', 'Abstract sample text for Greek-Template', NULL, 0, 1, 0),
(206, 71, 'Formal Letter Template', '2022-05-08 23:08:05', '2022-05-08 23:08:05', 'Other', '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n% Long Lined Cover Letter\n% LaTeX Template\n% Version 2.0 (September 17, 2021)\n%\n% This template originates from:\n% https://www.LaTeXTemplates.com\n%\n% Authors: Wlving Lee\n% (lee.wlving@connect.um.edu.mo)\n%\n% License:\n% CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/)\n%\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n%----------------------------------------------------------------------------------------\n%	PACKAGES AND OTHER DOCUMENT CONFIGURATIONS\n%----------------------------------------------------------------------------------------\n\n\\documentclass{article}\n\n\\usepackage{charter} % Use the Charter font\n\n\\usepackage[\n	a4paper, % Paper size\n	top=1in, % Top margin\n	bottom=1in, % Bottom margin\n	left=1in, % Left margin\n	right=1in, % Right margin\n	%showframe % Uncomment to show frames around the margins for debugging purposes\n]{geometry}\n\n\\setlength{\\parindent}{0pt} % Paragraph indentation\n\\setlength{\\parskip}{1em} % Vertical space between paragraphs\n\n\\usepackage{graphicx} % Required for including images\n\n\\usepackage{fancyhdr} % Required for customizing headers and footers\n\n\\fancypagestyle{firstpage}{%\n	\\fancyhf{} % Clear default headers/footers\n	\\renewcommand{\\headrulewidth}{0pt} % No header rule\n	\\renewcommand{\\footrulewidth}{1pt} % Footer rule thickness\n}\n\n\\fancypagestyle{subsequentpages}{%\n	\\fancyhf{} % Clear default headers/footers\n	\\renewcommand{\\headrulewidth}{1pt} % Header rule thickness\n	\\renewcommand{\\footrulewidth}{1pt} % Footer rule thickness\n}\n\n\\AtBeginDocument{\\thispagestyle{firstpage}} % Use the first page headers/footers style on the first page\n\\pagestyle{subsequentpages} % Use the subsequent pages headers/footers style on subsequent pages\n\n%----------------------------------------------------------------------------------------\n\n\\begin{document}\n\n%----------------------------------------------------------------------------------------\n%	FIRST PAGE HEADER\n%----------------------------------------------------------------------------------------\n\n\\vspace{-1em} % Pull the rule closer to the logo\n\n\\rule{\\linewidth}{1pt} % Horizontal rule\n\n\\bigskip\\bigskip % Vertical whitespace\n\n%----------------------------------------------------------------------------------------\n%	YOUR NAME AND CONTACT INFORMATION\n%----------------------------------------------------------------------------------------\n\n\\hfill\n\\begin{tabular}{l @{}}\n	\\today \\bigskip\\\\ % Date\n	XXX \\\\\n	Address 1 \\\\ % Address\n	Address 2 \\\\\n	Phone: (000) 111-1111 \\\\\n	Email: xxx@example.com\n\\end{tabular}\n\n\\bigskip % Vertical whitespace\n\n%----------------------------------------------------------------------------------------\n%	ADDRESSEE AND GREETING\n%----------------------------------------------------------------------------------------\n\n\\begin{tabular}{@{} l}\n	Mrs.\\ XXX \\\\\n	Recruitment Officer \\\\\n	The Corporation \\\\\n	123 Pleasant Lane \\\\\n	City, State 12345\n\\end{tabular}\n\n\\bigskip % Vertical whitespace\n\nDear Mrs.\\ XXX,\n\n\\bigskip % Vertical whitespace\n\n%----------------------------------------------------------------------------------------\n%	LETTER CONTENT\n%----------------------------------------------------------------------------------------\n\nPARAGRAPH ONE: State the reason for the letter, name the position or type of work you are applying for and identify the source from which you learned of the opening (i.e. career development center, newspaper, employment service, personal contact).\n\nPARAGRAPH TWO: Indicate why you are interested in the position, the company, its products, services - above all, stress what you can do for the employer. If you are a recent graduate, explain how your academic background makes you a qualified candidate for the position. If you have practical work experience, point out specific achievements or unique qualifications. Try not to repeat the same information the reader will find in the resume. Refer the reader to the enclosed resume or application which summarizes your qualifications, training, and experiences. The purpose of this section is to strengthen your resume by providing details which bring your experiences to life. \n \nPARAGRAPH THREE: Request a personal interview and indicate your flexibility as to the time and place. Repeat your phone number in the letter and offer assistance to help in a speedy response. For example, state that you will be in the city where the company is located on a certain date and would like to set up an interview. Alternatively, state that you will call on a certain date to set up an interview. End the letter by thanking the employer for taking time to consider your credentials. \n\n\\bigskip % Vertical whitespace\n\nSincerely yours,\n\n\\vspace{50pt} % Vertical whitespace\n\nJohn Smith\n\n\\end{document}\n', 'Abstract sample text for Formal Letter-Template', NULL, 0, 1, 0),
(207, 71, 'Book Template', '2022-05-08 23:08:25', '2022-05-08 23:08:25', 'Litterature', '%-------------------------%\n%-----Document Setup------%\n%-------------------------%\n\\documentclass[ebook,11pt,oneside,openany]{memoir}\n\\usepackage[utf8x]{inputenc}\n\\usepackage[english]{babel}\n\\usepackage{savetrees}\n\\usepackage{verbatim}\n\\linespread{1.6}\n\\setlength{\\footskip}{20pt}\n\n%-------------------------%\n%------Document Code------%\n%-------------------------%\n\\newcommand{\\thought}[1]{\\textit{#1}}\n\n\\newcommand{\\scenechange}{\n  \\par\n  \\vspace{\\baselineskip}\n  \\par\n\\noindent}\n%Creates a line break for a change of scene\n\n\\newcommand{\\majorchange}{\n  \\par\n  \\vspace{\\baselineskip}\n  \\hfill\n  \\textasteriskcentered\n  \\hfill\n  \\vspace{\\baselineskip}\n\\noindent}\n%creates a major line break, split by an asterisk for scene changes at the end of a page of where a sense of a major change is required. \n\n%-------------------------%\n%------Main Document------%\n%-------------------------%\n\\begin{document}\n\\title{Story Title}\n\\author{Author}\n\\date{}\n\\maketitle\n\n\\begin{comment}\n-------------------------\n----------Plot-----------\n-------------------------\nInsert section plot from 1-plot.text here\n-Section 1-\nMax X words\n\n----AIM----\n\n\n\n\n--Details--\n\n\n\n\n-------------------------\n------Senses Check-------\n-------------------------\nSmell\nTouch\nSound\nTaste\nSight\n\n-------------------------\n------Other Checks-------\n-------------------------\nChecked adverb use? (0)\nChecked cliche use? (0)\nChecked tense integrity?\nChecked perspective integrity?\nChecked reuse of major words?\nChecked sentence length?\nChecked simile use? (<=5)\nChecked metaphor use? (<=3)\nChecked description length?\nChecked paragraph density\n\nZombie Ipsum text from here: http://www.zombieipsum.com/\n\\end{comment}\n\n\nZombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.\n\nCum horribilem walking dead resurgere de crazed sepulcris creaturis, zombie sicut de grave feeding iride et serpens. Pestilentia, shaun ofthe dead scythe animated corpses ipsa screams. Pestilentia est plague haec decaying ambulabat mortuos. Sicut zeder apathetic malus voodoo. Aenean a dolor plan et terror soulless vulnerum contagium accedunt, mortui iam vivam unlife. Qui tardius moveri, brid eof reanimator sed in magna copia sint terribiles undeath legionis. Alii missing oculis aliorum sicut serpere crabs nostram. Putridi braindead odores kill and infect, aere implent left four dead.\n\nLucio fulci tremor est dark vivos magna. Expansis creepy arm yof darkness ulnis witchcraft missing carnem armis Kirkman Moore.\n\n\\end{document}', 'Abstract sample text for Book-Template', NULL, 0, 1, 0),
(208, 71, 'Article Template', '2022-05-08 23:10:24', '2022-05-08 23:10:24', 'Philosophy', '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n% Journal Article\n% LaTeX Template\n% Version 1.4 (15/5/16)\n%\n% This template has been downloaded from:\n% http://www.LaTeXTemplates.com\n%\n% Original author:\n% Frits Wenneker (http://www.howtotex.com) with extensive modifications by\n% Vel (vel@LaTeXTemplates.com)\n%\n% License:\n% CC BY-NC-SA 3.0 (http://creativecommons.org/licenses/by-nc-sa/3.0/)\n%\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n%-------------------------------------------------------------------------------\n%	PACKAGES AND OTHER DOCUMENT CONFIGURATIONS\n%-------------------------------------------------------------------------------\n\n\\documentclass[twoside,twocolumn]{article}\n\n\\usepackage{blindtext} % Package to generate dummy text throughout this template \n\n\\usepackage[sc]{mathpazo} % Use the Palatino font\n\\usepackage[T1]{fontenc} % Use 8-bit encoding that has 256 glyphs\n\\linespread{1.05} % Line spacing - Palatino needs more space between lines\n\\usepackage{microtype} % Slightly tweak font spacing for aesthetics\n\n\\usepackage[english]{babel} % Language hyphenation and typographical rules\n\n\\usepackage[hmarginratio=1:1,top=32mm,columnsep=20pt]{geometry} % Document margins\n\\usepackage[hang, small,labelfont=bf,up,textfont=it,up]{caption} % Custom captions under/above floats in tables or figures\n\\usepackage{booktabs} % Horizontal rules in tables\n\n\\usepackage{lettrine} % The lettrine is the first enlarged letter at the beginning of the text\n\n\\usepackage{enumitem} % Customized lists\n\\setlist[itemize]{noitemsep} % Make itemize lists more compact\n\n\\usepackage{abstract} % Allows abstract customization\n\\renewcommand{\\abstractnamefont}{\\normalfont\\bfseries} % Set the \"Abstract\" text to bold\n\\renewcommand{\\abstracttextfont}{\\normalfont\\small\\itshape} % Set the abstract itself to small italic text\n\n\\usepackage{titlesec} % Allows customization of titles\n\\renewcommand\\thesection{\\Roman{section}} % Roman numerals for the sections\n\\renewcommand\\thesubsection{\\roman{subsection}} % roman numerals for subsections\n\\titleformat{\\section}[block]{\\large\\scshape\\centering}{\\thesection.}{1em}{} % Change the look of the section titles\n\\titleformat{\\subsection}[block]{\\large}{\\thesubsection.}{1em}{} % Change the look of the section titles\n\n\\usepackage{fancyhdr} % Headers and footers\n\\pagestyle{fancy} % All pages have headers and footers\n\\fancyhead{} % Blank out the default header\n\\fancyfoot{} % Blank out the default footer\n\\fancyhead[C]{Running title $\\bullet$ May 2016 $\\bullet$ Vol. XXI, No. 1} % Custom header text\n\\fancyfoot[RO,LE]{\\thepage} % Custom footer text\n\n\\usepackage{titling} % Customizing the title section\n\n\\usepackage{hyperref} % For hyperlinks in the PDF\n\n%-------------------------------------------------------------------------------\n%	TITLE SECTION\n%-------------------------------------------------------------------------------\n\n\\setlength{\\droptitle}{-4\\baselineskip} % Move the title up\n\n\\pretitle{\\begin{center}\\Huge\\bfseries} % Article title formatting\n\\posttitle{\\end{center}} % Article title closing formatting\n\\title{Article Title} % Article title\n\\author{%\n\\textsc{John Smith}\\thanks{A thank you or further information} \\\\[1ex] % Your name\n\\normalsize University of California \\\\ % Your institution\n\\normalsize \\href{mailto:john@smith.com}{john@smith.com} % Your email address\n%\\and % Uncomment if 2 authors are required, duplicate these 4 lines if more\n%\\textsc{Jane Smith}\\thanks{Corresponding author} \\\\[1ex] % Second author\'s name\n%\\normalsize University of Utah \\\\ % Second author\'s institution\n%\\normalsize \\href{mailto:jane@smith.com}{jane@smith.com} % Second author\'s email address\n}\n\\date{\\today} % Leave empty to omit a date\n\\renewcommand{\\maketitlehookd}{%\n\\begin{abstract}\n\\noindent \\blindtext % Dummy abstract text - replace \\blindtext with your abstract text\n\\end{abstract}\n}\n\n%-------------------------------------------------------------------------------\n\n\\begin{document}\n\n% Print the title\n\\maketitle\n\n%-------------------------------------------------------------------------------\n%	ARTICLE CONTENTS\n%-------------------------------------------------------------------------------\n\n\\section{Introduction}\n\n\\lettrine[nindent=0em,lines=3]{L} orem ipsum dolor sit amet, consectetur adipiscing elit.\n\\blindtext % Dummy text\n\n\\blindtext % Dummy text\n\n%------------------------------------------------\n\n\\section{Methods}\n\nMaecenas sed ultricies felis. Sed imperdiet dictum arcu a egestas. \n\\begin{itemize}\n\\item Donec dolor arcu, rutrum id molestie in, viverra sed diam\n\\item Curabitur feugiat\n\\item turpis sed auctor facilisis\n\\item arcu eros accumsan lorem, at posuere mi diam sit amet tortor\n\\item Fusce fermentum, mi sit amet euismod rutrum\n\\item sem lorem molestie diam, iaculis aliquet sapien tortor non nisi\n\\item Pellentesque bibendum pretium aliquet\n\\end{itemize}\n\\blindtext % Dummy text\n\nText requiring further explanation\\footnote{Example footnote}.\n\n%------------------------------------------------\n\n\\section{Results}\n\n\\begin{table}\n\\caption{Example table}\n\\centering\n\\begin{tabular}{llr}\n\\toprule\n\\multicolumn{2}{c}{Name} \\\\\n\\cmidrule(r){1-2}\nFirst name & Last Name & Grade \\\\\n\\midrule\nJohn & Doe & $7.5$ \\\\\nRichard & Miles & $2$ \\\\\n\\bottomrule\n\\end{tabular}\n\\end{table}\n\n\\blindtext % Dummy text\n\n\\begin{equation}\n\\label{eq:emc}\ne = mc^2\n\\end{equation}\n\n\\blindtext % Dummy text\n\n%------------------------------------------------\n\n\\section{Discussion}\n\n\\subsection{Subsection One}\n\nA statement requiring citation \\cite{Figueredo:2009dg}.\n\\blindtext % Dummy text\n\n\\subsection{Subsection Two}\n\n\\blindtext % Dummy text\n\n%-------------------------------------------------------------------------------\n%	REFERENCE LIST\n%-------------------------------------------------------------------------------\n\n\\begin{thebibliography}{99} % Bibliography - this is intentionally simple in this template\n\n\\bibitem[Figueredo and Wolf, 2009]{Figueredo:2009dg}\nFigueredo, A.~J. and Wolf, P. S.~A. (2009).\n\\newblock Assortative pairing and life history strategy - a cross-cultural\n  study.\n\\newblock {\\em Human Nature}, 20:317--330.\n \n\\end{thebibliography}\n\n%-------------------------------------------------------------------------------\n\n\\end{document}\n', 'Abstract sample text for Article-Template', NULL, 0, 1, 0);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `requests`
--

CREATE TABLE `requests` (
  `reqId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `reqStatus` tinyint(1) NOT NULL DEFAULT 0,
  `reqState` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `tags`
--

CREATE TABLE `tags` (
  `tagId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `tagName` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userPassword` varchar(64) DEFAULT NULL,
  `userEmail` varchar(64) NOT NULL,
  `userFirstName` varchar(25) NOT NULL,
  `userSurName` varchar(25) NOT NULL,
  `userTelephone` varchar(15) DEFAULT NULL,
  `userDateOfBirth` date DEFAULT NULL,
  `userDarkMode` tinyint(1) DEFAULT 1,
  `userIsOnline` tinyint(1) DEFAULT 1,
  `userDateCreated` date DEFAULT NULL,
  `userDateUpdated` datetime DEFAULT NULL,
  `userCv` varchar(255) DEFAULT NULL,
  `userNotifications` int(99) DEFAULT 0,
  `userState` tinyint(1) DEFAULT 0,
  `userDeleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `coproject`
--
ALTER TABLE `coproject`
  ADD PRIMARY KEY (`coProjectId`),
  ADD UNIQUE KEY `projectId` (`projectId`),
  ADD UNIQUE KEY `coAuthorId` (`coAuthorId`);

--
-- Ευρετήρια για πίνακα `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`groupId`);

--
-- Ευρετήρια για πίνακα `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notificationId`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Ευρετήρια για πίνακα `papers`
--
ALTER TABLE `papers`
  ADD PRIMARY KEY (`paperId`),
  ADD UNIQUE KEY `paperOwnerId` (`paperOwnerId`);

--
-- Ευρετήρια για πίνακα `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`projectId`);

--
-- Ευρετήρια για πίνακα `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`reqId`),
  ADD UNIQUE KEY `userId` (`userId`),
  ADD UNIQUE KEY `projectId` (`projectId`);

--
-- Ευρετήρια για πίνακα `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tagId`),
  ADD UNIQUE KEY `userId` (`userId`),
  ADD UNIQUE KEY `projectId` (`projectId`);

--
-- Ευρετήρια για πίνακα `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `coproject`
--
ALTER TABLE `coproject`
  MODIFY `coProjectId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `groups`
--
ALTER TABLE `groups`
  MODIFY `groupId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT για πίνακα `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notificationId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `papers`
--
ALTER TABLE `papers`
  MODIFY `paperId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT για πίνακα `projects`
--
ALTER TABLE `projects`
  MODIFY `projectId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;

--
-- AUTO_INCREMENT για πίνακα `requests`
--
ALTER TABLE `requests`
  MODIFY `reqId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `tags`
--
ALTER TABLE `tags`
  MODIFY `tagId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `coproject`
--
ALTER TABLE `coproject`
  ADD CONSTRAINT `coproject_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`),
  ADD CONSTRAINT `coproject_ibfk_2` FOREIGN KEY (`coAuthorId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
