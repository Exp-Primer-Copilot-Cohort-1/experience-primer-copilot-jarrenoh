function skillsMember() {
    return {
        name: 'John',
        age: 30,
        skills: ['HTML', 'CSS', 'JS'],
        showSkills: function() {
            this.skills.forEach((skill) => {
                console.log(`${this.name} knows ${skill}`);
            });
        }
    };
}