// Data management for the Teacher Tech Card Battle Game

// Sample card data - replace with your 16 cards
const ALL_CARDS = [
    {
        id: 1,
        name: "Kahoot!",
        type: "Assessment",
        icon: "🎯",
        power: 85,
        defense: 70,
        speed: 90,
        description: "Create interactive quizzes and engage students with game-based learning. Great for formative assessment and review.",
        pdCode: "KAHOOT2026",
        resourceLink: "https://kahoot.com/schools/how-it-works/",
        offline: false
    },
    {
        id: 2,
        name: "Schoology",
        type: "Productivity",
        icon: "📚",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Schoology_logo.png",
        cardNumber: "S1-009",
        rarity: "Common",
        easeOfUse: "★★★★☆",
        gradeLevel: "All",
        setupTime: "High",
        power: 90,
        defense: 95,
        speed: 75,
        description: "A powerful LMS for hosting course materials, assignments, discussions, and grades in one place.",
        teacherTip: "Use folders with 'completion rules' to create self-paced learning paths for your students.",
        pdCode: "SCHOOLOGY2026",
        resourceLink: "https://www.schoology.com/",
        offline: true,
        qrCodeSVG: `<svg width="180" height="180" viewBox="0 0 528 528" xmlns="http://www.w3.org/2000/svg"><rect fill="#ffffff" x="0" y="0" width="528" height="528"/><g fill="#198639"><path d="M0,144h16h16v16v16h16V160V144V128h16h16v16h16v16H80v16H64v16h16v16H64v16h16v-16h16v16h16V224H80H64v16H48v-16V208V192H32H16v-16V160H0V144M0,224h16v16h16V240v16H16v16H0v-16V240V224M0,304h16v16v16h16v16H16v16v16h16V368h16v16v16H32H16H0v-16V368V352V336V320V304M16,208h16v16H16V208M16,288h16h16v16v16h16V304V288V272H80h16v16H80v16v16h16h16v16H96H80H64H48H32v-16V304H16V288m48-32h16v16H64V256m16,112h16v16H80V368m16-16h16h16h16v16H112H96H80V352m16-16h16h16v16H112H96H80V384m16,0h16h16v16H112H96H80V384m-80-256h16h16v16H112H96V128m16,32h16v16H112V160m-16,32h16v16H96V192m32-160h16v16v16H128V48V32m16,64h16v16H144V96m-16-48h16h16V128v16v16h16v16h16V160v-16h16v16v16h16V176v16h16h16V192v16H240H224V192h16V176h16V160h16V144v-16h-16V112h16V96h16V112h16v16h16V128h-16V144v16h-16V144H208V128H192H176V144v16h-16V144H144v-16H128V144V128m0,208h16h16v16h16v16h-16H144V352H128V336m16,48h16h16v16h16v16h-16v16v16h-16V432H128v-16V400V384m16,64h16v16h16v16H144H128v-16V448m16-432h16v16h16V0h16v16v16h16v-16V0h16v16v16v16v16v16H208V64V48H192V32H176v16H160V32H144v-16V0m16,64h16v16v16H144V80V64m16,128v16h16v-16H160m-16,400h16v16h16h16h16V496h16v-16V464H208V448h16v-16H208v-16V400V384h16h16v16v16v16h16v-16h16v-16H272V400h16v-16V368h16h16v-16h16v-16h16v16h-16h16v16h16V368h16V352h16V336h16v16h-16v16h16v16h16V368h16V384h16V400h16V384h16V368h16V352V336V320h16v-16h16v16v16h-16v16h16v16h16V368h16v16v16h16v-16V400H480v16h16v16h16v16h-16V448v16v16h-16V464H448V480H432v-16H416v16H400v16h-16v16h16h16v-16h16v16H400V496H384v16H368v16h-16V496H368v-16H384V464H368v16H352V464H336v16v16H320V480v16H304v16v16h16V496H304V480H288V464H272V448v-16h16v16h16V416h16v-16H288V384H272v-16H256v16h-16v16H224v-16V400V384H208V368v-16H192v16H176v16V336h16V320h16h16v16v16v16v16v16v16v16v16v16v16H240V464H256v16v16H240v16H224V496H208H192H176H160H144v16v16v16v-16V464V448V432V416V400V384H160v-16H176v16v16h16v-16H208V368h16V352h16h16v-16V320h16h16v16h-16v16h-16v16V400H256v16H272v16v16h-16V416H240V400V384H224V368H208V352H192V336h16V320h16V416h-16H176h-16V400H128V416H112v-16h16V400H128h16h16h16h16h16h16v16H128v16v16h16V464H128v16h16h16h16h16h16v16v16h16h16h16v16H208H192H176H160H144H128H112H96H80H64H48H32H16H0V528H104H112v-16H100L0,512V496V480V464V448V432V416V400m160-320h16v16h-16V96m16,32h16v16h-16V128m-16,208h16v16h-16V336m16,48h16h16v16h-16V384h-16m16,112h16v16h-16V464m16-352h16v16h-16V112m16,192h16v16h-16V304m16,112h16v16h-16V416m16,80h16v16h-16V496m16-384h16v16h-16V112m16,256h16v16h-16V368m-16,48h16v16h-16V416m16-256h16v16h-16V160m16,112h16v16h-16V272m16-112h16v16h-16V160m-16,96h16v16h-16V256m16,48h16v16h-16V304m16-160h16v16h-16V144m16,160h16v16h-16V304m16,48h16v16h-16V352m16,128h16v16h-16V480m16-368h16v16h-16V112m16,128h16v16h-16V240m16-80h16v16h-16V160m16,48h16v16h-16V208m16,80h16v16h-16V288m16,80h16v16h-16V368m16,32h16v16h-16V400m16-16h16v16h-16V384m16-16h16v16h-16V368m-16,32h16v16h-16V400m-16,32h16v16h-16V432m16-208h16v16h-16V224m16,16h16v16h-16V240m-16,16h16v16h-16V256m-16-16h16v16h-16V240m-16-16h16v16h-16V224m-16-16h16v16h-16V208m-16-16h16v16h-16V192m-16-16h16v16h-16V176m16,16h16v16h-16V192m-16,16h16v16h-16V208m-16,16h16v16h-16V224m-16,16h16v16h-16V240m-16-16h16v16h-16V224m-16-16h16v16h-16V208m-16-16h16v16h-16V192m16-32h16v16h-16V160m16-16h16v16h-16V144m16-16h16v16h-16V128m-16,16h16v16h-16V144m-16,16h16v16h-16V160m-16-16h16v16h-16V144m-16-16h16v16h-16V128m-16-16h16v16h-16V112m16,16h16v16h-16V128m16-16h16v16h-16V112m16-16h16v16h-16V96m16,16h16v16h-16V112m16-16h16v16h-16V96m16-16h16v16h-16V80m16-16h16v16h-16V64m16-16h16v16h-16V48m16-16h16v16h-16V32m-16,16h16v16h-16V48m16-16h16v16h-16V32m-16-16h16v16h-16V16m-16,16h16v16h-16V32m-16-16h16v16h-16V16m-16,16h16v16h-16V32m-16-16h16v16h-16V16m16,48h16v16h-16V64m16-16h16v16h-16V48m16,32h16v16h-16V80m-16,16h16v16h-16V96m16,16h16v16h-16V112m-16,16h16v16h-16V128m16-48h16v16h-16V80m16-16h16v16h-16V64m-16,16h16v16h-16V80m-16,16h16v16h-16V96m-16,16h16v16h-16V112m16,48h16v16h-16V160m16-16h16v16h-16V144m-16,16h16v16h-16V160m16,16h16v16h-16V176m16-16h16v16h-16V160m-16,16h16v16h-16V176m16,16h16v16h-16V192m-16,16h16v16h-16V208m-16,16h16v16h-16V224m-16,16h16v16h-16V240m-16,16h16v16h-16V256m16-48h16v16h-16V208m-16,16h16v16h-16V224m-16,16h16v16h-16V240m16,32h16v16h-16V272m-16,16h16v16h-16V288m16-16h16v16h-16V272m-16,16h16v16h-16V288m16-16h16v16h-16V272m16,32h16v16h-16V304m16-16h16v16h-16V288m-16,16h16v16h-16V304m-16,16h16v16h-16V320m-16,16h16v16h-16V336m16,16h16v16h-16V352m16-16h16v16h-16V336m-16-16h16v16h-16V320m-16,16h16v16h-16V336m16-32h16v16h-16V304m-16,16h16v16h-16V320m-16,16h16v16h-16V336m16,32h16v16h-16V368m-16,16h16v16h-16V384m16-16h16v16h-16V368m-16,16h16v16h-16V384m-16,16h16v16h-16V400m-16,16h16v16h-16V416m16-16h16v16h-16V400m-16,16h16v16h-16V416m16,16h16v16h-16V432m-16,16h16v16h-16V448m-16,16h16v16h-16V464m16-16h16v16h-16V448m-16,16h16v16h-16V464m-16,16h16v16h-16V480m-16,16h16v16h-16V496m-16,16h16v16h-16V512m-16-16h16v16h-16V496m-16-16h16v16h-16V480m-16-16h16v16h-16V464m16-16h16v16h-16V448m-16-16h16v16h-16V432m16-16h16v16h-16V416m16,32h16v16h-16V448m16-16h16v16h-16V432m16-16h16v16h-16V416m16,32h16v16h-16V448m16-16h16v16h-16V432m16-16h16v16h-16V416m16,32h16v16h-16V448m16-16h16v16h-16V432m16-16h16v16h-16V416m16,32h16v16h-16V448m-16,16h16v16h-16V464m16,16h16v16h-16V480m16-16h16v16h-16V464m16,16h16v16h-16V480m16,16h16v16h-16V496m16-16h16v16h-16V480m16-16h16v16h-16V464m-16,16h16v16h-16V480m16,32h16v16h-16V512m16-16h16v16h-16V496m-16,16h16v16h-16V512m-16-16h16v16h-16V496m16,32h16v16h-16V528m16-16h16v16h-16V512m-16,16h16v16h-16V528m16-32h16v16h-16V496m16-16h16v16h-16V480m16,16h16v16h-16V496m-16,16h16v16h-16V512m16-16h16v16h-16V496m-16,16h16v16h-16V512m16,16h16v16h-16V528"/></g></svg>`
    },
    {
        id: 3,
        name: "Nearpod",
        type: "Collaboration",
        icon: "📱",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Nearpod_logo.png?20151124144710",
        cardNumber: "S1-012",
        rarity: "Rare",
        easeOfUse: "★★★★☆",
        gradeLevel: "All",
        setupTime: "Medium",
        power: 80,
        defense: 75,
        speed: 85,
        description: "A dynamic presentation tool for creating interactive lessons with polls, quizzes, and collaborative boards.",
        teacherTip: "Add a 'Collaborate Board' as a bell ringer to get students engaged the moment they walk in.",
        pdCode: "NEARPOD2026",
        resourceLink: "https://nearpod.com/educators",
        offline: false,
        qrCodeSVG: `<svg width="180" height="180" viewBox="0 0 528 528" xmlns="http://www.w3.org/2000/svg"><rect fill="#ffffff" x="0" y="0" width="528" height="528"/><g fill="#198639"><path d="M0,144h16h16v16v16h16V160V144V128h16h16v16h16v16H80v16H64v16h16v16H64v16h16v-16h16v16h16V224H80H64v16H48v-16V208V192H32H16v-16V160H0V144M0,224h16v16h16V240v16H16v16H0v-16V240V224M0,304h16v16v16h16v16H16v16v16h16V368h16v16v16H32H16H0v-16V368V352V336V320V304M16,208h16v16H16V208M16,288h16h16v16v16h16V304V288V272H80h16v16H80v16v16h16h16v16H96H80H64H48H32v-16V304H16V288m48-32h16v16H64V256m16,112h16v16H80V368m16-16h16h16h16v16H112H96H80V352m16-16h16h16v16H112H96H80V384m16,0h16h16v16H112H96H80V384m-80-256h16h16v16H112H96V128m16,32h16v16H112V160m-16,32h16v16H96V192m32-160h16v16v16H128V48V32m16,64h16v16H144V96m-16-48h16h16V128v16v16h16v16h16V160v-16h16v16v16h16V176v16h16h16V192v16H240H224V192h16V176h16V160h16V144v-16h-16V112h16V96h16V112h16v16h16V128h-16V144v16h-16V144H208V128H192H176V144v16h-16V144H144v-16H128V144V128m0,208h16h16v16h16v16h-16H144V352H128V336m16,48h16h16v16h16v16h-16v16v16h-16V432H128v-16V400V384m16,64h16v16h16v16H144H128v-16V448m16-432h16v16h16V0h16v16v16h16v-16V0h16v16v16v16v16v16H208V64V48H192V32H176v16H160V32H144v-16V0m16,64h16v16v16H144V80V64m16,128v16h16v-16H160m-16,400h16v16h16h16h16V496h16v-16V464H208V448h16v-16H208v-16V400V384h16h16v16v16v16h16v-16h16v-16H272V400h16v-16V368h16h16v-16h16v-16h16v16h-16h16v16h16V368h16V352h16V336h16v16h-16v16h16v16h16V368h16V384h16V400h16V384h16V368h16V352V336V320h16v-16h16v16v16h-16v16h16v16h16V368h16v16v16h16v-16V400H480v16h16v16h16v16h-16V448v16v16h-16V464H448V480H432v-16H416v16H400v16h-16v16h16h16v-16h16v16H400V496H384v16H368v16h-16V496H368v-16H384V464H368v16H352V464H336v16v16H320V480v16H304v16v16h16V496H304V480H288V464H272V448v-16h16v16h16V416h16v-16H288V384H272v-16H256v16h-16v16H224v-16V400V384H208V368v-16H192v16H176v16V336h16V320h16h16v16v16v16v16v16v16v16v16v16v16H240V464H256v16v16H240v16H224V496H208H192H176H160H144v16v16v16v-16V464V448V432V416V400V384H160v-16H176v16v16h16v-16H208V368h16V352h16h16v-16V320h16h16v16h-16v16h-16v16V400H256v16H272v16v16h-16V416H240V400V384H224V368H208V352H192V336h16V320h16V416h-16H176h-16V400H128V416H112v-16h16V400H128h16h16h16h16h16h16v16H128v16v16h16V464H128v16h16h16h16h16h16v16v16h16h16h16v16H208H192H176H160H144H128H112H96H80H64H48H32H16H0V528H104H112v-16H100L0,512V496V480V464V448V432V416V400m160-320h16v16h-16V96m16,32h16v16h-16V128m-16,208h16v16h-16V336m16,48h16h16v16h-16V384h-16m16,112h16v16h-16V464m16-352h16v16h-16V112m16,192h16v16h-16V304m16,112h16v16h-16V416m16,80h16v16h-16V496m16-384h16v16h-16V112m16,256h16v16h-16V368m-16,48h16v16h-16V416m16-256h16v16h-16V160m16,112h16v16h-16V272m16-112h16v16h-16V160m-16,96h16v16h-16V256m16,48h16v16h-16V304m16-160h16v16h-16V144m16,160h16v16h-16V304m16,48h16v16h-16V352m16,128h16v16h-16V480m16-368h16v16h-16V112m16,128h16v16h-16V240m16-80h16v16h-16V160m16,48h16v16h-16V208m16,80h16v16h-16V288m16,80h16v16h-16V368m16,32h16v16h-16V400m16-16h16v16h-16V384m16-16h16v16h-16V368m-16,32h16v16h-16V400m-16,32h16v16h-16V432m16-208h16v16h-16V224m16,16h16v16h-16V240m-16,16h16v16h-16V256m-16-16h16v16h-16V240m-16-16h16v16h-16V224m-16-16h16v16h-16V208m-16-16h16v16h-16V192m-16-16h16v16h-16V176m16,16h16v16h-16V192m-16,16h16v16h-16V208m-16,16h16v16h-16V224m-16,16h16v16h-16V240m-16-16h16v16h-16V224m-16-16h16v16h-16V208m-16-16h16v16h-16V192m16-32h16v16h-16V160m16-16h16v16h-16V144m16-16h16v16h-16V128m-16,16h16v16h-16V144m-16,16h16v16h-16V160m-16-16h16v16h-16V144m-16-16h16v16h-16V128m-16-16h16v16h-16V112m16,16h16v16h-16V128m16-16h16v16h-16V112m16-16h16v16h-16V96m16,16h16v16h-16V112m16-16h16v16h-16V96m16-16h16v16h-16V80m16-16h16v16h-16V64m16-16h16v16h-16V48m16-16h16v16h-16V32m-16,16h16v16h-16V48m16-16h16v16h-16V32m-16-16h16v16h-16V16m-16,16h16v16h-16V32m-16-16h16v16h-16V16m-16,16h16v16h-16V32m-16-16h16v16h-16V16m16,48h16v16h-16V64m16-16h16v16h-16V48m16,32h16v16h-16V80m-16,16h16v16h-16V96m16,16h16v16h-16V112m-16,16h16v16h-16V128m16-48h16v16h-16V80m16-16h16v16h-16V64m-16,16h16v16h-16V80m-16,16h16v16h-16V96m-16,16h16v16h-16V112m16,48h16v16h-16V160m16-16h16v16h-16V144m-16,16h16v16h-16V160m16,16h16v16h-16V176m16-16h16v16h-16V160m-16,16h16v16h-16V176m16,16h16v16h-16V192m-16,16h16v16h-16V208m-16,16h16v16h-16V224m-16,16h16v16h-16V240m-16,16h16v16h-16V256m16-48h16v16h-16V208m-16,16h16v16h-16V224m-16,16h16v16h-16V240m16,32h16v16h-16V272m-16,16h16v16h-16V288m16-16h16v16h-16V272m-16,16h16v16h-16V288m16-16h16v16h-16V272m16,32h16v16h-16V304m16-16h16v16h-16V288m-16,16h16v16h-16V304m-16,16h16v16h-16V320m-16,16h16v16h-16V336m16,16h16v16h-16V352m16-16h16v16h-16V336m-16-16h16v16h-16V320m-16,16h16v16h-16V336m16-32h16v16h-16V304m-16,16h16v16h-16V320m-16,16h16v16h-16V336m16,32h16v16h-16V368m-16,16h16v16h-16V384m16-16h16v16h-16V368m-16,16h16v16h-16V384m-16,16h16v16h-16V400m-16,16h16v16h-16V416m16-16h16v16h-16V400m-16,16h16v16h-16V416m16,16h16v16h-16V432m-16,16h16v16h-16V448m-16,16h16v16h-16V464m16-16h16v16h-16V448m-16,16h16v16h-16V464m-16,16h16v16h-16V480m-16,16h16v16h-16V496m-16,16h16v16h-16V512m-16-16h16v16h-16V496m-16-16h16v16h-16V480m-16-16h16v16h-16V464m16-16h16v16h-16V448m-16-16h16v16h-16V432m16-16h16v16h-16V416m16,32h16v16h-16V448m16-16h16v16h-16V432m16-16h16v16h-16V416m16,32h16v16h-16V448m16-16h16v16h-16V432m16-16h16v16h-16V416m16,32h16v16h-16V448m16-16h16v16h-16V432m16-16h16v16h-16V416m16,32h16v16h-16V448m-16,16h16v16h-16V464m16,16h16v16h-16V480m16-16h16v16h-16V464m16,16h16v16h-16V480m16,16h16v16h-16V496m16-16h16v16h-16V480m16-16h16v16h-16V464m-16,16h16v16h-16V480m16,32h16v16h-16V512m16-16h16v16h-16V496m-16,16h16v16h-16V512m-16-16h16v16h-16V496m16,32h16v16h-16V528m16-16h16v16h-16V512m-16,16h16v16h-16V528m16-32h16v16h-16V496m16-16h16v16h-16V480m16,16h16v16h-16V496m-16,16h16v16h-16V512m16-16h16v16h-16V496m-16,16h16v16h-16V512m16,16h16v16h-16V528"/></g></svg>`
    },
    {
        id: 4,
        name: "Flipgrid",
        type: "Video",
        icon: "🎥",
        power: 75,
        defense: 70,
        speed: 80,
        description: "Empower student voice through video discussions and social learning.",
        pdCode: "FLIPGRID2026",
        resourceLink: "https://info.flip.com/en-us.html",
        offline: false
    },
    {
        id: 5,
        name: "Padlet",
        type: "Collaboration",
        icon: "📝",
        power: 70,
        defense: 80,
        speed: 85,
        description: "Digital bulletin board for collaborative brainstorming and sharing ideas.",
        pdCode: "PADLET2026",
        resourceLink: "https://padlet.com/about",
        offline: false
    },
    {
        id: 6,
        name: "Quizlet",
        type: "Study",
        icon: "🎴",
        power: 75,
        defense: 75,
        speed: 80,
        description: "Create digital flashcards and study sets to help students master content.",
        pdCode: "QUIZLET2026",
        resourceLink: "https://quizlet.com/features",
        offline: true
    },
    {
        id: 7,
        name: "Seesaw",
        type: "Portfolio",
        icon: "🎨",
        power: 85,
        defense: 80,
        speed: 70,
        description: "Student-driven digital portfolios that empower students to showcase learning.",
        pdCode: "SEESAW2026",
        resourceLink: "https://web.seesaw.me/",
        offline: false
    },
    {
        id: 8,
        name: "Edpuzzle",
        type: "Video",
        icon: "▶️",
        power: 80,
        defense: 75,
        speed: 75,
        description: "Make any video your lesson with interactive questions and analytics.",
        pdCode: "EDPUZZLE2026",
        resourceLink: "https://edpuzzle.com/",
        offline: false
    },
    {
        id: 9,
        name: "Canva",
        type: "Design",
        icon: "🎨",
        power: 85,
        defense: 70,
        speed: 80,
        description: "Create stunning visual content and presentations with easy-to-use design tools.",
        pdCode: "CANVA2026",
        resourceLink: "https://www.canva.com/education/",
        offline: true
    },
    {
        id: 10,
        name: "Gimkit",
        type: "Game",
        icon: "🎮",
        power: 90,
        defense: 65,
        speed: 95,
        description: "Live learning game where students earn virtual currency by answering questions.",
        pdCode: "GIMKIT2026",
        resourceLink: "https://www.gimkit.com/",
        offline: false
    },
    {
        id: 11,
        name: "BookCreator",
        type: "Creativity",
        icon: "📖",
        power: 75,
        defense: 80,
        speed: 70,
        description: "Create and publish digital books with text, images, audio and video.",
        pdCode: "BOOKCREATOR2026",
        resourceLink: "https://bookcreator.com/",
        offline: true
    },
    {
        id: 12,
        name: "Classcraft",
        type: "Gamification",
        icon: "⚔️",
        power: 80,
        defense: 85,
        speed: 75,
        description: "Transform classroom management with role-playing game mechanics.",
        pdCode: "CLASSCRAFT2026",
        resourceLink: "https://www.classcraft.com/",
        offline: false
    },
    {
        id: 13,
        name: "Screencastify",
        type: "Recording",
        icon: "🎬",
        power: 70,
        defense: 75,
        speed: 85,
        description: "Create video tutorials and screencasts directly from your browser.",
        pdCode: "SCREENCAST2026",
        resourceLink: "https://www.screencastify.com/",
        offline: true
    },
    {
        id: 14,
        name: "Wakelet",
        type: "Curation",
        icon: "🗂️",
        power: 75,
        defense: 80,
        speed: 80,
        description: "Curate and organize digital content into beautiful collections.",
        pdCode: "WAKELET2026",
        resourceLink: "https://wakelet.com/",
        offline: false
    },
    {
        id: 15,
        name: "Mentimeter",
        type: "Polling",
        icon: "📊",
        power: 80,
        defense: 70,
        speed: 90,
        description: "Create interactive presentations with live polls and quizzes.",
        pdCode: "MENTIMETER2026",
        resourceLink: "https://www.mentimeter.com/",
        offline: false
    },
    {
        id: 16,
        name: "Scratch",
        type: "Coding",
        icon: "💻",
        power: 85,
        defense: 80,
        speed: 70,
        description: "Teach coding and computational thinking with block-based programming.",
        pdCode: "SCRATCH2026",
        resourceLink: "https://scratch.mit.edu/educators",
        offline: true
    }
];

// Sample teacher data
let teachers = [
    {
        id: 1,
        name: "Ms. Johnson",
        gradeLevel: "3rd Grade",
        department: "Elementary",
        ownedCards: [1, 2, 5, 10],
        cardMastery: { 1: 2, 2: 1, 5: 1, 10: 2 }, // cardId: masteryLevel (1=Basic, 2=Certified, 3=Master)
        wins: 5,
        losses: 2
    },
    {
        id: 2,
        name: "Mr. Smith",
        gradeLevel: "5th Grade",
        department: "Elementary",
        ownedCards: [2, 3, 6, 8, 12],
        cardMastery: { 2: 1, 3: 2, 6: 1, 8: 1, 12: 1 },
        wins: 3,
        losses: 4
    },
    {
        id: 3,
        name: "Mrs. Garcia",
        gradeLevel: "8th Grade",
        department: "Middle School",
        ownedCards: [1, 4, 7, 9, 11, 15],
        cardMastery: { 1: 2, 4: 2, 7: 3, 9: 2, 11: 1, 15: 1 },
        wins: 7,
        losses: 1
    }
];

// Current user
let currentTeacher = null;

// Local storage functions
function saveData() {
    localStorage.setItem('teachers', JSON.stringify(teachers));
    if (currentTeacher) {
        localStorage.setItem('currentTeacher', JSON.stringify(currentTeacher));
    }
}

function loadData() {
    const savedTeachers = localStorage.getItem('teachers');
    if (savedTeachers) {
        teachers = JSON.parse(savedTeachers);
    }

    const savedCurrentTeacher = localStorage.getItem('currentTeacher');
    if (savedCurrentTeacher) {
        currentTeacher = JSON.parse(savedCurrentTeacher);
    }
}

// Teacher management
function addTeacher(name, gradeLevel = 'N/A', department = 'Other') {
    const newTeacher = {
        id: teachers.length + 1,
        name: name,
        gradeLevel: gradeLevel,
        department: department,
        ownedCards: [1, 2], // Start with 2 basic cards
        cardMastery: { 1: 1, 2: 1 }, // Start at Basic level
        wins: 0,
        losses: 0
    };
    teachers.push(newTeacher);
    saveData();
    return newTeacher;
}

function getTeacher(id) {
    return teachers.find(t => t.id === id);
}

function getCurrentTeacher() {
    return currentTeacher;
}

function setCurrentTeacher(teacher) {
    currentTeacher = teacher;
    saveData();
}

function logout() {
    currentTeacher = null;
    localStorage.removeItem('currentTeacher');
}

// Card management
function getCard(id) {
    return ALL_CARDS.find(c => c.id === id);
}

function getAllCards() {
    return ALL_CARDS;
}

function getTeacherCards(teacher) {
    return teacher.ownedCards.map(id => getCard(id));
}

function addCardToTeacher(teacherId, cardId) {
    const teacher = getTeacher(teacherId);
    if (teacher && !teacher.ownedCards.includes(cardId)) {
        teacher.ownedCards.push(cardId);
        // Initialize card mastery if not exists
        if (!teacher.cardMastery) {
            teacher.cardMastery = {};
        }
        teacher.cardMastery[cardId] = 1; // Start at Basic level
        saveData();
        return true;
    }
    return false;
}

// Card mastery management
function getCardMastery(teacher, cardId) {
    if (!teacher.cardMastery) return 1; // Default to Basic
    return teacher.cardMastery[cardId] || 1;
}

function evolveCard(teacherId, cardId) {
    const teacher = getTeacher(teacherId);
    if (teacher && hasCard(teacher, cardId)) {
        if (!teacher.cardMastery) {
            teacher.cardMastery = {};
        }
        const currentLevel = teacher.cardMastery[cardId] || 1;
        if (currentLevel < 3) {
            teacher.cardMastery[cardId] = currentLevel + 1;
            saveData();
            return true;
        }
    }
    return false;
}

function getMasteryLabel(level) {
    const labels = {
        1: '⭐ Basic',
        2: '⭐⭐ Certified',
        3: '⭐⭐⭐ Master'
    };
    return labels[level] || labels[1];
}

function hasCard(teacher, cardId) {
    return teacher.ownedCards.includes(cardId);
}

function redeemPDCode(code) {
    const card = ALL_CARDS.find(c => c.pdCode === code.toUpperCase());
    if (card && currentTeacher) {
        return addCardToTeacher(currentTeacher.id, card.id);
    }
    return false;
}

// Battle management
function recordBattleResult(winnerId, loserId) {
    const winner = getTeacher(winnerId);
    const loser = getTeacher(loserId);

    if (winner && loser) {
        winner.wins++;
        loser.losses++;
        saveData();
    }
}

// Leaderboard functions
function getLeaderboardData(departmentFilter = 'all') {
    let filteredTeachers = teachers;

    if (departmentFilter !== 'all') {
        filteredTeachers = teachers.filter(t => t.department === departmentFilter);
    }

    // Sort by cards collected
    const byCards = [...filteredTeachers].sort((a, b) => b.ownedCards.length - a.ownedCards.length);

    // Sort by win rate
    const byWinRate = [...filteredTeachers]
        .filter(t => (t.wins + t.losses) > 0)
        .sort((a, b) => {
            const winRateA = a.wins / (a.wins + a.losses);
            const winRateB = b.wins / (b.wins + b.losses);
            return winRateB - winRateA;
        });

    return {
        byCards,
        byWinRate
    };
}

function getDepartmentStats() {
    const departments = {};
    const totalCards = ALL_CARDS.length;

    teachers.forEach(teacher => {
        const dept = teacher.department || 'Other';
        if (!departments[dept]) {
            departments[dept] = {
                teachers: [],
                totalCards: 0,
                avgCards: 0,
                totalWins: 0
            };
        }
        departments[dept].teachers.push(teacher);
        departments[dept].totalCards += teacher.ownedCards.length;
        departments[dept].totalWins += teacher.wins;
    });

    // Calculate averages
    Object.keys(departments).forEach(dept => {
        const stats = departments[dept];
        stats.avgCards = Math.round(stats.totalCards / stats.teachers.length);
        stats.percentComplete = Math.round((stats.avgCards / totalCards) * 100);
    });

    return departments;
}

function isMentor(teacher) {
    // A teacher is a mentor if they have:
    // - At least 5 wins
    // - At least 60% win rate (if they have played battles)
    // - At least 10 cards collected
    const totalGames = teacher.wins + teacher.losses;
    const winRate = totalGames > 0 ? teacher.wins / totalGames : 0;

    return teacher.wins >= 5 &&
           winRate >= 0.6 &&
           teacher.ownedCards.length >= 10;
}

// Initialize data on load
loadData();
