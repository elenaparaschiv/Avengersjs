const { app } = require('@azure/functions');

// Dictionary of Avenger code names and real names
const avengers = {
    'IronMan': 'Tony Stank',
    'CaptainAmerica': 'Steve Rogers',
    'BlackWidow': 'Natasha Romanoff',
    'Hulk': 'Bruce Banner',
    'Thor': 'Thor Odinson',
    'Hawkeye': 'Clint Barton',
};

// Function to get Avenger by code name
app.http('GetAvenger', {
    methods: ['GET'],
    authLevel: 'function',
    route: 'avengers/{codename?}',
    handler: async (request, context) => {
        const codeName = request.params.codename;

        if (codeName) {
            const realName = avengers[codeName];
            if (!realName) {
                return {
                    status: 404,
                    body: `The Avenger code name '${codeName}' is not recognized.`
                };
            }
            context.log(`Returning real name: '${realName}'`);
            context.log(`The Avenger code name '${codeName}' is not recognized.`)
            context.log('Hello')
            return {
                status: 200,
                body: JSON.stringify({ realName: realName })
            };
        } else {
            // If no codename is provided, return the entire list
            return {
                status: 200,
                body: JSON.stringify(avengers)
            };
        }
    }
});

// Function to delete Avenger by code name
app.http('DeleteAvenger', {
    methods: ['DELETE'],
    authLevel: 'function',
    route: 'avengers/{codeName}',
    handler: async (request, context) => {
        const codeName = request.params.codeName;

        if (request.method === 'DELETE') {
            return {
                status: 200,
                body: `Avenger: ${codeName} has been deleted.`
            };
        } else {
            return {
                status: 405,
                body: "This HTTP method is not supported."
            };
        }
    }
});