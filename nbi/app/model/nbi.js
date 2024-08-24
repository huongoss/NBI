
import { LatDMSToDegree, LonDMSToDegree } from './utils';

export default class Model {
    constructor(url) {
        this.data = null;
        this.url = url;
    }

    async fetchData() {
        if (!this.data) {
            const response = await fetch(this.url);
            this.data = await response.json();
            this.data = this.data.map((bridge) => {
                return {
                    longitude: LonDMSToDegree(bridge.longitude),
                    latitude: LatDMSToDegree(bridge.latitude)
                }
            });
        }
        return this.data;
    }
}