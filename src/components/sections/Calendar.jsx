export default function Calendar({ section }) {
    const rows = [
        ['', '', '', '1', '2', '3', '4'],
        ['5', '6', '7', '8', '9', '10', '11'],
        ['12', '13', '14', '15', '16', '17', '18'],
        ['19', '20', '21', '22', '23', '24', '25'],
        ['26', '27', '28', '', '', '', '']
    ];

    return (
        <div className="mt-8 space-y-6">
            <div className="flex justify-center">
                <div className="bg-color-5/20 p-4 rounded-lg border border-color-5 w-full max-w-sm">
                    <h4 className="text-center font-bold mb-2 text-color-1">{section.month}</h4>
                    <table className="w-full text-center text-base">
                        <thead>
                            <tr className="text-color-2">
                                <th>Di</th><th>Lu</th><th>Ma</th><th>Me</th><th>Je</th><th>Ve</th><th>Sa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIdx) => (
                                <tr key={rowIdx}>
                                    {row.map((day, dayIdx) => {
                                        if (day === '') return <td key={dayIdx}></td>;
                                        const isHighlighted = parseInt(day) === section.highlightDay;
                                        return (
                                            <td
                                                key={dayIdx}
                                                className={`py-1 ${isHighlighted ? 'bg-color-3 text-white rounded-full font-bold relative group cursor-pointer hover:bg-opacity-90 transition-colors' : ''}`}
                                            >
                                                {day}
                                                {isHighlighted && (
                                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-color-1 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                                                        Jour de naissance
                                                    </span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
