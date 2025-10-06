import oracledb from 'oracledb';

// Para devolver resultados como objetos
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Inicializa un pool de conexiones
export async function initOracle() {
  try {
    await oracledb.createPool({
      user: "paciente",                  // 👈 tu usuario de Oracle
      password: "CapstoneSafe_2025",     // 👈 tu password
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

export async function getConnection() {
  return await oracledb.getConnection();
}