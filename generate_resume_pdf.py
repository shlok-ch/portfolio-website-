import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle

def build_pdf(filename="Shlok_Chaturvedi_Resume.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    primary_color = colors.HexColor("#0f172a")     # Deep slate
    accent_color = colors.HexColor("#1e40af")      # Royal blue
    text_dark = colors.HexColor("#1e293b")         # Charcoal body
    muted_text = colors.HexColor("#475569")        # Muted slate

    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        alignment=1 # Center
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=muted_text,
        alignment=1 # Center
    )

    section_header_style = ParagraphStyle(
        'SectionHeaderStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=accent_color,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_dark
    )

    item_title_style = ParagraphStyle(
        'ItemTitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=primary_color
    )

    date_style = ParagraphStyle(
        'DateStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=13,
        textColor=muted_text,
        alignment=2 # Right
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=text_dark,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2
    )

    story = []

    # Name and Header
    story.append(Paragraph("SHLOK CHATURVEDI", name_style))
    story.append(Spacer(1, 4))
    contact_text = (
        "Jaipur, Rajasthan, India &nbsp;•&nbsp; +91-7737257861 &nbsp;•&nbsp; "
        "shlokchaturvedi08@gmail.com &nbsp;•&nbsp; "
        "linkedin.com/in/shlok-chaturvedi &nbsp;•&nbsp; github.com/shlok-ch"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cbd5e1"), spaceAfter=8))

    # Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_header_style))
    summary_text = (
        "Detail-oriented B.Tech Computer Science undergraduate at JK Lakshmipat University with strong "
        "expertise in Python, MySQL, and Data Structures. Experienced in machine learning, database design, "
        "and data analytics. Proven ability to handle large datasets (40M+ records) and build scalable solutions. "
        "Seeking internship opportunities in software development, data analytics, machine learning, or FinTech."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 8))

    # Education
    story.append(Paragraph("EDUCATION", section_header_style))
    edu_row = [
        Paragraph("<b>B.Tech in Computer Science</b> — JK Lakshmipat University, Jaipur", item_title_style),
        Paragraph("2024 – Present", date_style)
    ]
    t = Table([edu_row], colWidths=[400, 140])
    t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(t)
    story.append(Paragraph("<b>Relevant Coursework:</b> Data Structures, Algorithms, Database Management Systems (DBMS), Programming, Finance", bullet_style))
    story.append(Paragraph("<b>Status:</b> Undergraduate Student", bullet_style))
    story.append(Spacer(1, 8))

    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_header_style))
    skills_data = [
        [Paragraph("<b>Programming Languages:</b>", item_title_style), Paragraph("Python, C", body_style)],
        [Paragraph("<b>Databases:</b>", item_title_style), Paragraph("MySQL, Relational Database Management Systems (DBMS)", body_style)],
        [Paragraph("<b>Computer Science Core:</b>", item_title_style), Paragraph("Data Structures, Algorithms, DBMS, Object-Oriented Principles", body_style)],
        [Paragraph("<b>Data & Machine Learning:</b>", item_title_style), Paragraph("Machine Learning, Data Analysis, Large Dataset Processing", body_style)],
        [Paragraph("<b>Tools & Technologies:</b>", item_title_style), Paragraph("Streamlit, Pandas, NumPy, Git, GitHub, SEO, Artificial Intelligence Tools", body_style)],
    ]
    skills_table = Table(skills_data, colWidths=[150, 390])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 8))

    # Projects
    story.append(Paragraph("PROJECTS", section_header_style))
    
    # Project 1: PathFinder Pro
    p1_row = [
        Paragraph("<b>PathFinder Pro</b> — Machine Learning / Traffic Forecasting", item_title_style),
        Paragraph("Jan 2026", date_style)
    ]
    t1 = Table([p1_row], colWidths=[420, 120])
    t1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(t1)
    story.append(Paragraph("• Built an intelligent navigation system using 40M+ traffic records to forecast congestion and enhance route planning.", bullet_style))
    story.append(Paragraph("• Applied machine learning models for congestion forecasting and predictive traffic pattern analysis.", bullet_style))
    story.append(Paragraph("• Processed and structured large-scale datasets to optimize route prediction efficiency.", bullet_style))
    story.append(Spacer(1, 4))

    # Project 2: Campus Access and Compliance System
    p2_row = [
        Paragraph("<b>Campus Access and Compliance System</b> — Database Management System", item_title_style),
        Paragraph("Apr 2025", date_style)
    ]
    t2 = Table([p2_row], colWidths=[420, 120])
    t2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(t2)
    story.append(Paragraph("• Designed a normalized relational database schema to track campus vehicle entry, exit records, and compliance violations.", bullet_style))
    story.append(Paragraph("• Automated rule-based penalty calculations, significantly minimizing manual verification effort and errors.", bullet_style))
    story.append(Paragraph("• Authored complex SQL queries and views for administrative auditing, reporting, and vehicle monitoring.", bullet_style))
    story.append(Spacer(1, 4))

    # Project 3: StockSense
    p3_row = [
        Paragraph("<b>StockSense</b> — FinTech & Market Trend Analysis Dashboard", item_title_style),
        Paragraph("Feb 2026", date_style)
    ]
    t3 = Table([p3_row], colWidths=[420, 120])
    t3.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(t3)
    story.append(Paragraph("• Developed an interactive equity market analytics dashboard utilizing Streamlit and Python for technical analysis.", bullet_style))
    story.append(Paragraph("• Integrated Yahoo Finance API (yfinance) to ingest and visualize historical market price trends and indicators.", bullet_style))
    story.append(Paragraph("• Implemented data manipulation pipelines with Pandas and NumPy for moving averages and price distribution metrics.", bullet_style))
    story.append(Spacer(1, 8))

    # Certifications
    story.append(Paragraph("CERTIFICATIONS", section_header_style))
    story.append(Paragraph("• <b>Global Entrepreneurship</b> — Hanyang University", bullet_style))
    story.append(Paragraph("• <b>Social Media Content Strategy</b> — Adobe", bullet_style))
    story.append(Paragraph("• <b>Google SEO</b> — University of California", bullet_style))
    story.append(Spacer(1, 8))

    # Additional Interests
    story.append(Paragraph("AREAS OF INTEREST", section_header_style))
    story.append(Paragraph("Software Development &nbsp;•&nbsp; Machine Learning &nbsp;•&nbsp; Data Analytics &nbsp;•&nbsp; FinTech &nbsp;•&nbsp; Database Systems", body_style))

    doc.build(story)
    print("PDF generated successfully:", filename)

if __name__ == '__main__':
    build_pdf()
