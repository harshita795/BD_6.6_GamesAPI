let request = require("supertest");
let { app } = require("../index.js");
let { getAllGames, getGameById } = require("../controllers");
let http = require("http");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllGames: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all the games", () => {
    let mockGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];

    getAllGames.mockReturnValue(mockGames);

    let result = getAllGames();
    expect(result).toEqual(mockGames);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoint tests", () => {
  it("GET API /games/ should return all the games", async () => {
    const res = await request(server).get("/games");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      games: [
        {
          gameId: 1,
          title: "The Legend of Zelda: Breath of the Wild",
          genre: "Adventure",
          platform: "Nintendo Switch",
        },
        {
          gameId: 2,
          title: "Red Dead Redemption 2",
          genre: "Action",
          platform: "PlayStation 4",
        },
        {
          gameId: 3,
          title: "The Witcher 3: Wild Hunt",
          genre: "RPG",
          platform: "PC",
        },
      ],
    });
  });

  it("GET API /games/details/:id should return details of game by Id", async () => {
    const res = await request(server).get("/games/details/1");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      game: {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
    });
  });
});
