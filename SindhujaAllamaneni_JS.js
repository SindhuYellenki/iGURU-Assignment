const reportContainerEl=document.getElementById("reportContainer")
const schoolDetailsContainerEl=document.getElementById("schoolDetailsContainer")
const studentDetailsEl=document.getElementById("studentDetails")
const tableBodyEl=document.getElementById("tableBody")
const resultsContainerEl=document.getElementById("resultsContainer")

function renderdt(container,value){
    const valueEl=document.createElement("dt")
    valueEl.textContent=value
    container.appendChild(valueEl)
}

function renderdd(container,value){
    const valueEl=document.createElement("dd")
    valueEl.textContent=value
    container.appendChild(valueEl)
}

function renderTableRow(Subject,Grade){
    const trEl=document.createElement("tr")
    tableBodyEl.appendChild(trEl)

    const tdEl=document.createElement("td")
    tdEl.classList.add("subject-result-styling")
    tdEl.textContent=Subject.toUpperCase()
    trEl.appendChild(tdEl)
    //appending Single Grade Value For All Columns
    for (i=0;i<8;i++){
        const tdEl=document.createElement("td")
   
    tdEl.textContent=Grade
    trEl.appendChild(tdEl)
    }
    
}


const displayReportCard=studentDetails=>{

    const{ClassName,FatherName,Grade,MotherName,Name,DOB,RollNumber,SchoolAddress,SchoolEmail,SchoolName,SchoolPhoneNumber,TotalMarks,TotalMaxMarks,Totalper,PresenceDays,SubjectGradeList}=studentDetails
    
    const logoContainerEl=document.createElement("div")
    logoContainerEl.classList.add("logoContainer")
    schoolDetailsContainerEl.appendChild(logoContainerEl)

    const schoolLogoEl=document.createElement("img")
    schoolLogoEl.src="https://res.cloudinary.com/dcnvnz3bk/image/upload/v1680199664/schoolImage_iflqa0.png"
    schoolLogoEl.classList.add("schoolLogo")
    logoContainerEl.appendChild(schoolLogoEl)

    const schoolDetailsTextContainerEl=document.createElement("div")
    schoolDetailsTextContainerEl.classList.add("schoolDetailsTextContainer")
    schoolDetailsContainerEl.appendChild(schoolDetailsTextContainerEl)

    const schoolNameEl=document.createElement("h1")
    schoolNameEl.textContent=SchoolName
    schoolNameEl.classList.add("schoolName")
    schoolDetailsTextContainerEl.appendChild(schoolNameEl)

    const addressEl=document.createElement("p")
    addressEl.textContent=SchoolAddress+` SchoolPhoneNumber:${SchoolPhoneNumber}`
    addressEl.classList.add("address")
    schoolDetailsTextContainerEl.appendChild(addressEl)

    const emailEl=document.createElement("p")
    emailEl.textContent=`Visit Us at:${SchoolEmail}`
    emailEl.classList.add("email")
    schoolDetailsTextContainerEl.appendChild(emailEl)

    const reportCardParaEl=document.createElement("p")
    reportCardParaEl.classList.add("reportCardPara")
    reportCardParaEl.textContent="REPORT CARD"
    schoolDetailsTextContainerEl.appendChild(reportCardParaEl)

    const academicSessionEl=document.createElement("p")
    academicSessionEl.classList.add("reportCardPara")
    academicSessionEl.textContent="ACADEMIC SESSION: 2022-2023"
    schoolDetailsTextContainerEl.appendChild(academicSessionEl)

    

    const listContainer1El = document.createElement("dl");
    listContainer1El.classList.add("listContainer")
    studentDetailsEl.appendChild(listContainer1El)

    renderdt(listContainer1El,"Scholar No")
    renderdd(listContainer1El,":-")
    listContainer1El.appendChild(document.createElement("br"))

    renderdt(listContainer1El,"Roll No")
    renderdd(listContainer1El,`:-${RollNumber}`)
    listContainer1El.appendChild(document.createElement("br"))

    renderdt(listContainer1El,"Father's Name")
    renderdd(listContainer1El,`:-${FatherName}`)
    listContainer1El.appendChild(document.createElement("br"))

    renderdt(listContainer1El,"Attendance")
    renderdd(listContainer1El,`:-${PresenceDays}`)
    listContainer1El.appendChild(document.createElement("br"))

    const listContainer2El = document.createElement("dl");
    listContainer2El.classList.add("listContainer")
    studentDetailsEl.appendChild(listContainer2El)

    renderdt(listContainer2El,"Class")
    renderdd(listContainer2El,`:-${ClassName}`)
    listContainer2El.appendChild(document.createElement("br"))

    renderdt(listContainer2El,"Name of Student")
    renderdd(listContainer2El,`:-${Name}`)
    listContainer2El.appendChild(document.createElement("br"))

    renderdt(listContainer2El,"Mother's Name")
    renderdd(listContainer2El,`:-${MotherName}`)
    listContainer2El.appendChild(document.createElement("br"))

    renderdt(listContainer2El,"Date of Birth")
    renderdd(listContainer2El,`:-${DOB}`)
    listContainer2El.appendChild(document.createElement("br"))

    for(let each of SubjectGradeList){
        console.log(each)
        renderTableRow(each.subject,each.grade)
    }
    renderTableRow("Total",Grade)

    const ResultEl=document.createElement("p")
    ResultEl.textContent=`Result:-PASS`
    ResultEl.classList.add("result")
    resultsContainerEl.appendChild(ResultEl)

    const percentageEl=document.createElement("p")
    percentageEl.textContent=`Percentage:-${Totalper}%`
    ResultEl.classList.add("result")
    resultsContainerEl.appendChild(percentageEl)

    const gradeEl=document.createElement("p")
    gradeEl.textContent=`Grade:-${Grade}`
    ResultEl.classList.add("result")
    resultsContainerEl.appendChild(gradeEl)
}

const destructureData=data=>{
    //console.log(data.Response.ProgressList)
    let studentInfo=data.Response.ProgressList.lstStudentInfo
    const {ClassName,FatherName,Grade,MotherName,Name,DOB,RollNumber,SchoolAddress,SchoolEmail,SchoolName,SchoolPhoneNumber,TotalMarks,TotalMaxMarks,Totalper}=studentInfo[0]
    const {PresenceDays}=studentInfo[0].cusAttendance[0]
    let studentDetails={ClassName,FatherName,Grade,MotherName,Name,DOB,RollNumber,SchoolAddress,SchoolEmail,SchoolName,SchoolPhoneNumber,TotalMarks,TotalMaxMarks,Totalper,PresenceDays}
    const SubjectsScoresList=data.Response.ProgressList.lstStudentInfo[0].lstStudent
    const SubjectScore=SubjectsScoresList.map(each=>{
        const subjectDetails={Grade:each.SubjectGrade,Subject:each.SubjectName,Term:each.RptName}
        return(subjectDetails)
    })
    const SubjectList=[]
    const SubjectGradeList=[]
    for (let each of SubjectScore){
        if(SubjectList.includes(each.Subject)===false){
            SubjectList.push(each.Subject)
            SubjectGradeList.push({subject:each.Subject,grade:each.Grade})
        }
    }
    studentDetails={...studentDetails,SubjectGradeList}
    displayReportCard(studentDetails)
}


fetch('http://stageapi.iguru.guru:222/api/ExamManagement/GetStudentProgressReports?schoolID=282&sectionID=2682&eXamMasID=8442&students=181521')
  .then(response => response.json())
  .then(data => destructureData(data))
  .catch(error => console.error(error));
