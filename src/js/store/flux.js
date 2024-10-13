const BASEURL = "https://www.swapi.tech/api"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			loading: false,
			favorites:[],
			people:[
				
			],
			planets: [],
			peopleDetails:[],
			filmsDetails:[],
			planetsDetails: []
		},
		actions: {
			makeRequest: async (noun) => {
				const store = getStore()
				const storage = window.localStorage;
				// Revisamos si ya hay datos en el localStorage
				if (storage.getItem(noun)) {
					console.log(`Se ha conseguido información de ${noun} en el Local Storage`);
					let data = storage.getItem(noun);
					let parsedData = JSON.parse(data);
					setStore({ [noun]: parsedData });
					return parsedData;
				}

				if (!store.loading) {
				setStore({loading: true})	
				}
				// Si no hay datos en el Local Storage, hacemos la solicitud a la API
				try {
					const response = await fetch(`${BASEURL}/${noun}`);
					if (response.ok) {
						let data = await response.json();
						// Guardamos los datos en el localStorage usando la clave dinámica
						storage.setItem(noun, JSON.stringify(data.result || data.results));
						setStore({loading: false})
						return data.result || data.results;
					} else {
						throw Error(`Error: ${response.status} - ${response.statusText}`);
					}
				} catch (error) {
					console.error(error);
					throw error;
				}
			},
			getFilms: async () => {
				const actions = getActions();
				try {
					// Hacemos la solicitud y obtenemos los datos (ya sea desde la API o localStorage)
					const data = await actions.makeRequest("films");
					setStore({ filmsDetails: data });

				} catch (error) {
					console.error("Error fetching films: " + error);
				}
			},
			getCharacters: async () => {
				const actions = getActions();
				try {
					// Hacemos la solicitud y obtenemos los datos (ya sea desde la API o localStorage)
					const data = await actions.makeRequest("people");
					setStore({ people: data });
					actions.fetchDetails("people");
				} catch (error) {
					console.error("Error fetching Characters: " + error);
				}
			},
			fetchDetails: async (storeInfo) => {
				const urlExtractor = (item) => item.url

				const store = getStore()
				const storage = window.localStorage
				if(storage.getItem(`${storeInfo}Details`)){
					let details = storage.getItem(`${storeInfo}Details`)
					let parsedDetails = JSON.parse(details)
					setStore({[`${storeInfo}Details`]: parsedDetails})
					return
				}

				const detailPromises = store[storeInfo].map(async (item) => {
				  try {
					const response = await fetch(urlExtractor(item));
					if (response.ok) {
					  const data = await response.json();
					  return data.result; // Aquí obtienes las propiedades 
					} else {
					  throw new Error(`Error ${response.status} - ${response.statusText}`);
					}
				  } catch (error) {
					console.error(error);
				  }
				});
		  
				// Resolviendo todas las promesas y actualizando el estado
				const resolvedDetails = await Promise.all(detailPromises);
				setStore({[`${storeInfo}Details`]: resolvedDetails});
				storage.setItem(`${storeInfo}Details`, JSON.stringify(resolvedDetails))
			  },
			  getPlanets: async () => {
				const actions = getActions();
				const storage = window.localStorage;
				
				
				if (storage.getItem("planets")) {
					console.log("Se ha conseguido información de planets en el Local Storage");
					let data = storage.getItem("planets");
					let parsedData = JSON.parse(data);
					setStore({ planets: parsedData });
					actions.fetchDetails("planets"); 
					return;
				}
				
				try {
					const data = await actions.makeRequest("planets");
					setStore({ planets: data });
					actions.fetchDetails("planets");
				} catch (error) {
					console.log(error);
				}
			},
			addFavorite: (favorite) =>{
				const store = getStore()
				setStore({favorites: [...store.favorites,favorite]})
			},
			removeFavorite: (id, type) =>{
				const store = getStore()
				setStore({
					...store,
					favorites: store.favorites.filter(fav => !(fav.uid === id && fav.type === type))
				  });
			}

		}
	};
};

export default getState;
