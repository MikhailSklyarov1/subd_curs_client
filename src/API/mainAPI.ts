import axios from "axios"

class LessonService {
    static async getSomeRecords(num: number) {
        const res = await axios.get(`http://localhost:5000/api/records?num=${num}`);
        return res;
    }

    static async getSomeRecordsWithVaryEmo(minVary: number, maxVary: number, num: number) {
        const res = await axios.get(`http://localhost:5000/api/records/vary_emo?num=${num}&min_count_vary_emo=${minVary}&max_count_vary_emo=${maxVary}`);
        return res;
    }
}

export default LessonService;