const BASE_URL = "http://localhost:8080";

const HealthDeclarationServices = {
    postHealthDeclaration: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/health-declaration`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to post health declaration");
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            throw error;
        }
    },

    getHealthDeclarations: async () => {
        try {
            const response = await fetch(`${BASE_URL}/health-declarations`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch health declarations");
            }

            const responseData = await response.json();
            return responseData.data;
        } catch (error) {
            throw error;
        }
    },
}
export default HealthDeclarationServices;


