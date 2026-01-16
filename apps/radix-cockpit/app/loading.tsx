export default function Loading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div>
          <div
            style={{
              width: 220,
              height: 28,
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          />
          <div
            style={{
              width: 140,
              height: 14,
              marginTop: 8,
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          />
        </div>
        <div
          style={{
            width: 220,
            height: 18,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        />
      </div>

      <div>
        <div
          style={{
            width: 120,
            height: 18,
            marginBottom: 8,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}
            >
              <div
                style={{
                  width: "60%",
                  height: 12,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              />
              <div
                style={{
                  width: "80%",
                  height: 22,
                  marginTop: 10,
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
              />
              <div
                style={{
                  width: "70%",
                  height: 12,
                  marginTop: 10,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}
          >
            <div
              style={{
                width: "55%",
                height: 16,
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
                width: "85%",
                height: 12,
                marginTop: 10,
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}>
        <div
          style={{
            width: 100,
            height: 16,
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
            width: "86%",
            height: 12,
            marginTop: 10,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        />
      </div>
    </div>
  );
}
