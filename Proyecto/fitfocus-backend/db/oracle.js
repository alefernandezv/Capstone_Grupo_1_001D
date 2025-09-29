const oracledb = require('oracledb');

// Para devolver resultados como objetos
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Inicializa un pool de conexiones
async function initOracle() {
  try {
    await oracledb.createPool({
      user: "paciente",        // 👈 pon aquí tu usuario de Oracle
      password: "CapstoneSafe_2025",   // 👈 pon aquí tu password
      connectString: "localhost:1521/XEPDB1", // 👈 ejemplo: "localhost:1521/XEPDB1"
      poolMin: 1,
      poolMax: 5,
      poolIncrement: 1
    });
    console.log("✅ Oracle conectado");
  } catch (err) {
    console.error("❌ Error creando el pool de Oracle:", err);
  }
}

async function getConnection() {
  return await oracledb.getConnection();
}

module.exports = { initOracle, getConnection };