export class Contacts {
    id: string;
    email: string | null;
    name: string;
    randomColor: string;

    // Liste der verfügbaren Farben
    private static readonly colors = [
        '#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8',
        '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701',
        '#0038FF', '#00FFFF', '#FF0000', '#FF4646', '#FFBB2B'
    ];

    constructor(obj?: any) {
        this.id = obj ? obj.id : null;
        this.email = obj ? obj.email : null;
        this.name = obj ? obj.name : null;
        this.randomColor = Contacts.getRandomColor(); // Zufällige Farbe zuweisen
    }

    // Statische Methode zum Auswählen einer zufälligen Farbe
    private static getRandomColor(): string {
        const colors = Contacts.colors;
        return colors[Math.floor(Math.random() * colors.length)];
    }
}
