export default function Loading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div
          style={{
            width: 260,
            height: 28,
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        />
        <div
          style={{
            width: 220,
            height: 14,
            marginTop: 8,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        />
      </div>

      <div>
        <div
          style={{
            width: 140,
            height: 18,
            marginBottom: 8,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}
            >
              <div
                style={{
                  width: "65%",
                  height: 14,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              />
              <div
                style={{
                  width: "50%",
                  height: 12,
                  marginTop: 10,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              />
              <div
                style={{
                  width: "90%",
                  height: 12,
                  marginTop: 10,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              />
              <div
                style={{
                  width: "80%",
                  height: 12,
                  marginTop: 10,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div
          style={{
            width: 180,
            height: 18,
            marginBottom: 8,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}
            >
              <div
                style={{
                  width: "70%",
                  height: 14,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              />
              <div
                style={{
                  width: "92%",
                  height: 12,
                  marginTop: 10,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              />
              <div
                style={{
                  width: "86%",
                  height: 12,
                  marginTop: 10,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
