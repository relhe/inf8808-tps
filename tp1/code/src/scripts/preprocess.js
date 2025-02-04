/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function cleanNames(data) {
  // TODO: Clean the player name data
  return data.map((columns) => ({
    ...columns,
    Player: columns.Player.split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '),
  }));
}

/**
 * Finds the names of the 5 players with the most lines in the play.
 *
 * @param {object[]} data The dataset containing all the lines of the play
 * @returns {string[]} The names of the top 5 players with most lines
 */
export function getTopPlayers(data) {
  // TODO: Find the five top players with the most lines in the play
  // Count the number of lines for each player
  // Count the number of occurrences of each player's name
  const numberOfLine = data.reduce((acc, { Player }) => {
    acc[Player] = (acc[Player] || 0) + 1;
    return acc;
  }, {});

  // Sort players by line count in descending order
  const sortedPlayers = Object.entries(numberOfLine).sort(
    ([, a], [, b]) => b - a,
  );

  // Extract the names of the top 5 players
  return sortedPlayers.slice(0, 5).map(([player]) => player);
}

/**
 * Transforms the data by nesting it, grouping by act and then by player, indicating the line count
 * for each player in each act.
 *
 * The resulting data structure ressembles the following :
 *
 * [
 *  { Act : ___,
 *    Players : [
 *     {
 *       Player : ___,
 *       Count : ___
 *     }, ...
 *    ]
 *  }, ...
 * ]
 *
 * The number of the act (starting at 1) follows the 'Act' key. The name of the player follows the
 * 'Player' key. The number of lines that player has in that act follows the 'Count' key.
 *
 * @param {object[]} data The dataset
 * @returns {object[]} The nested data set grouping the line count by player and by act
 */
export function summarizeLines(data) {
  // TODO : Generate the data structure as defined above
  // Group data by act
  const groupedByAct = data.reduce((acc, { Act, Player }) => {
    if (!acc[Act]) acc[Act] = {}; // Initialize object for each act
    acc[Act][Player] = (acc[Act][Player] || 0) + 1; // Count lines per player
    return acc;
  }, {});

  // Transform grouped data into the desired structure
  return Object.entries(groupedByAct).map(([act, players]) => ({
    Act: parseInt(act, 10), // Ensure Act is a number
    Players: Object.entries(players).map(([player, count]) => ({
      Player: player,
      Count: count,
    })),
  }));
}

/**
 * For each act, replaces the players not in the top 5 with a player named 'Other',
 * whose line count corresponds to the sum of lines uttered in the act by players other
 * than the top 5 players.
 *
 * @param {object[]} data The dataset containing the count of lines of all players
 * @param {string[]} top The names of the top 5 players with the most lines in the play
 * @returns {object[]} The dataset with players not in the top 5 summarized as 'Other'
 */
export function replaceOthers(data, top) {
  // TODO : For each act, sum the lines uttered by players not in the top 5 for the play
  // and replace these players in the data structure by a player with name 'Other' and
  // a line count corresponding to the sum of lines
  return data.map(({ Act, Players }) => {
    const updatedPlayers = [];
    let otherCount = 0;

    Players.forEach(({ Player, Count }) => {
      if (top.includes(Player)) {
        updatedPlayers.push({ Player, Count });
      } else {
        otherCount += Count;
      }
    });

    if (otherCount > 0) {
      updatedPlayers.push({ Player: 'Other', Count: otherCount });
    }

    return { Act, Players: updatedPlayers };
  });
}
