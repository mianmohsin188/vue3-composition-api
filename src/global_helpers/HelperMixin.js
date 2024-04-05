import Swal from "sweetalert2";

const HelperMixin={
    methods:{
        convertJsonToCSV(jsonData){
            if(jsonData.length>0){
                const header = Object.keys(jsonData[0]).join(',');
                const rows = jsonData.map(obj => {
                    return Object.values(obj).map(value => {
                        // If the value is a string and contains a comma, enclose it in double quotes
                        if (typeof value === 'string' && value.includes(',')) {
                            return `"${value}"`;
                        }
                        return value;
                    }).join(',');
                });
                return `${header}\n${rows.join('\n')}`;

            }
            else{
                Swal.fire(
                    "Error",
                    "Please provide data to convert it to CSV",
                    'error'
                )
                return false;
            }
        },
        downloadCsv(csvData,filename){
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename+'.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    }

}
export default HelperMixin;
