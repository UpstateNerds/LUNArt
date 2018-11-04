function drawSolarEclipse(data) {
    //Eclipse
    if (data) {
        if (Math.abs(daysUntilEclipse+1) < 10) {
            tint(255, 255-(Math.abs(daysUntilEclipse)*17));
            image(solarEclipseImg, (windowWidth/2)-450, 50, 0);
        }
        
        //Sun    
        fill('yellow');
        ellipse((windowWidth/2 + daysUntilEclipse), windowHeight/2, 510, 510);
    }
}

function calculateDaysUntilEclipse(date) {
    const momentNextEclipseDate = moment().year(date.year).month(date.month-1).date(date.day);
    const currentDate = moment();

    const daysUntilEclipse = Math.abs(Math.floor(moment.duration(momentNextEclipseDate.diff(currentDate)).asDays()));

    return Math.abs(daysUntilEclipse);
}