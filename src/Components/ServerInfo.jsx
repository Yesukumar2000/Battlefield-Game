import React, { useState, useEffect } from 'react';
import './ServerInfo.css';
const ServerInfo = () => {
    const [serverData, setServerData] = useState(null);
    const [mapRotation, setMapRotation] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = 'https://battle-field-backend.vercel.app/api';

    useEffect(() => {
        const fetchServerInfo = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/server-info`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setServerData(data);
            } catch (e) {
                setError("Failed to load server information. Please ensure the Node.js backend server is deployed correctly.");
            } finally {
                setLoading(false);
            }
        };
        const fetchMapRotation = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/map-rotation`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMapRotation(data);
            } catch (e) {
                console.error("Failed to fetch map rotation:", e);
                setError("Failed to load map rotation. Please ensure the Node.js backend server is deployed correctly.");
            } finally {
                setLoading(false);
            }
        };

        fetchServerInfo();
        fetchMapRotation();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#1a202c', color: '#fff' }}>
                Loading server data...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#1a202c', color: '#ef4444', textAlign: 'center', padding: '20px' }}>
                Error: {error}
            </div>
        );
    }

    if (!serverData) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#1a202c', color: '#fff' }}>
                No server data available.
            </div>
        );
    }
    return (
        <>
            <div className="server">
                <div className="side-menu__tabs">
                    <a href="/" className="side-menu__game side-menu__game--bfv w-inline-block">
                        <div className="side-menu__popup">
                            <div className="side-menu__text">Battlefield v</div>
                        </div>
                    </a>
                    <a href="/" className="side-menu__game side-menu__game--bf1 w-inline-block">
                        <div className="side-menu__popup">
                            <div className="side-menu__text">Battlefield 1</div>
                        </div>
                    </a>
                    <a href="/" className="side-menu__game side-menu__game--bf4 side-menu__game--bf4-fake w-inline-block">
                        <div className="side-menu__popup">
                            <div className="side-menu__text">Battlefield 4</div>
                        </div>
                    </a>
                    <a href="/" className="side-menu__game side-menu__game--bfh w-inline-block">
                        <div className="side-menu__popup">
                            <div className="side-menu__text">Battlefield Hardline</div>
                        </div>
                    </a>
                    <a href="https://battlefield-4-webflow-rebuild.webflow.io/game?tab=tab-career" className="side-menu__career w-inline-block">
                        <div className="side-menu__popup">
                            <div className="side-menu__text">career</div>
                        </div>
                    </a>
                    <a href="https://battlefield-4-webflow-rebuild.webflow.io/game?tab=tab-watch" className="side-menu__watch w-inline-block">
                        <div className="side-menu__popup">
                            <div className="side-menu__text">watch</div>
                        </div>
                    </a>
                    <a href="https://battlefield-4-webflow-rebuild.webflow.io/game?tab=tab-news" className="side-menu__news w-inline-block">
                        <div className="side-menu__popup">
                            <div className="side-menu__text">news</div>
                        </div>
                    </a>
                    <a href="https://battlefield-4-webflow-rebuild.webflow.io/game?tab=tab-help" className="side-menu__help w-inline-block">
                        <div className="side-menu__popup">
                            <div className="side-menu__text">help</div>
                        </div>
                    </a>
                </div>
                <div className="side-menu__quit">
                    <div className="side-menu__quit-popup">
                        <div className="side-menu__text">quit</div>
                    </div>
                </div>
                <div className="side-menu__bar"></div>
                <nav className="browser__breadcrumb">
                    <div className="browser__breadcrumb-previous-1">
                        <a href="/server-browser" className="browser__breadcrumb-back-w w-inline-block">
                            <img src="https://cdn.prod.website-files.com/6013fff62154adaa4600f932/601ab21dde67c22de2b6d61b_back.svg" loading="lazy" alt="" className="browser__breadcrumb-back" />
                        </a>
                        <a href="/multiplayer" className="browser__breadcrumb-previous-1">multiplayer</a>
                        <div className="browser__breadcrumb-bar">/</div>
                        <a href="/server-browser" className="browser__breadcrumb-previous-2">server Browser</a>
                        <div className="browser__breadcrumb-bar">/</div>
                    </div>
                    <div className="browser__breadcrumb-h">server info</div>
                </nav>
                <div className="server__next-overlay"></div>
                <main className="server__content">
                    <section className="server__info-w">
                        <div className="server__name">{serverData.serverName}</div>
                        <div className="server__info">
                            <img alt="" loading="lazy" src={serverData.flagUrl || "https://cdn.prod.website-files.com/6022d2c0d37628c87d9e16ab/6022d74ce15ae958f20e10a9_america-flag.svg"} className="server__flag" />
                            <div className="server__mode">{serverData.mapName} - {serverData.gameMode}</div>
                        </div>
                        <div className="server__desc">{serverData.antiCheatInfo} | {serverData.discordLink}</div>
                    </section>
                    <section className="server__buttons-w">
                        {["join", "spectate", "join as commander"].map((btn, i) => (
                            <button className="server__button" key={btn}>
                                <span className="server__button-text">{btn}</span>
                            </button>
                        ))}
                        <button className="server__button server__button--favorite">
                            <img src="https://cdn.prod.website-files.com/6013fff62154adaa4600f932/601ab1b8ba5feb6d6e9bb7f6_favorites%20-%20black.svg" loading="lazy" alt="" className="server__favorite server__favorite--black" />
                            <img src="https://cdn.prod.website-files.com/6013fff62154adaa4600f932/601ab1b8abc05e847f1ac43f_favorites%20-%20white.svg" loading="lazy" alt="" className="server__favorite server__favorite--white" />
                            <p className="server__button-text" style={{marginLeft: '18px'}}>13672</p>
                        </button>
                    </section>
                    <section className="server__current-stats-w">
                        <div className="server__current-stats">
                            <div className="server__current-stats-h">players</div>
                            <div className="server__current-stats-i-w">
                                <div className="server__current-stats-i">{serverData.players}</div>
                            </div>
                        </div>
                        <div className="server__current-stats">
                            <div className="server__current-stats-h">ping</div>
                            <div className="server__current-stats-i-w">
                                <div className="server__current-stats-i">{serverData.ping}</div>
                            </div>
                        </div>
                        <div className="server__current-stats">
                            <div className="server__current-stats-h">tickrate</div>
                            <div className="server__current-stats-i-w">
                                <div className="server__current-stats-i">{serverData.tickrate}</div>
                            </div>
                        </div>
                    </section>
                    <section className="server__settings-w">
                        <div className="server__settings">
                            <div className="server__settings-h">settings</div>
                            {(serverData.settings || []).map((item, index) => (
                                <div key={index} className="server__setting">
                                    <span className="server__setting-text">{item.label}</span>
                                    <span className="server__setting-text">{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="server__settings">
                            <div className="server__settings-h">advanced</div>
                            {(serverData.advanced || []).map((item, index) => (
                                <div key={index} className="server__setting">
                                    <span className="server__setting-text">{item.label}</span>
                                    <span className="server__setting-text">{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="server__settings">
                            <div className="server__settings-h">rules</div>
                            {(serverData.rules || []).map((item, index) => (
                                <div key={index} className="server__setting">
                                    <span className="server__setting-text">{item.label}</span>
                                    <span className="server__setting-text">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="server__next-w">
                        <div className="server__next-h">map rotation</div>
                        <div className="server__maps-w">
                            {(mapRotation).map((maps, idx) => (
                                <>
                                    <div className="server__map" key={idx}>
                                        <div className="server__map-image-w">
                                            <div className="server__map-image-overlay"></div>
                                            <img src={maps.image} loading="eager" alt="" className="server__map-image" />
                                        </div>
                                        <div className="server__map-mode">conquest large</div>
                                        <span className="server__map-mode">{maps.name}</span>
                                    </div>
                                    
                                </>
                            ))}
                            {(mapRotation).map((maps, idx) => (
                                <>
                                    <div className="server__map" key={idx}>
                                        <div className="server__map-image-w">
                                            <div className="server__map-image-overlay"></div>
                                            <img src={maps.image} loading="eager" alt="" className="server__map-image" />
                                        </div>
                                        <div className="server__map-mode">conquest large</div>
                                        <span className="server__map-mode">{maps.name}</span>
                                    </div>
                                    
                                </>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
            <aside className="invite">
                <div className="invite__line"></div>
                <div className="invite__squad">
                    <div className="invite__squad-h-w">
                        <img
                            src="https://cdn.prod.website-files.com/6013fff62154adaa4600f932/601ab15999e303e7c202c28c_squad.svg"
                            loading="lazy"
                            alt=""
                            className="invite__squad-icon"
                        />
                        <div className="invite__squad-h">squad</div>
                    </div>
                    <div className="invite__join-w">
                        <img
                            src="https://cdn.prod.website-files.com/6013fff62154adaa4600f932/601ab1596100550691c84f76_home__join-black.svg"
                            loading="lazy"
                            alt=""
                            className="invite__join-icon invite__join-icon--black"
                        />
                        <img
                            src="https://cdn.prod.website-files.com/6013fff62154adaa4600f932/601ab158769fa828e95f98df_home__join-default.svg"
                            loading="lazy"
                            alt=""
                            className="invite__join-icon invite__join-icon--default"
                        />
                         <div className="invite__friend-info">
                            <div className="invite__join-h">squad Join</div>
                        </div>
                        {/* <div className="invite__join-h">squad  {"  "}join</div> */}
                    </div>
                </div>
                <div className="invite__line"></div>
                <div className="invite__online">
                    <div className="invite__online-h-w">
                        <img
                            src="https://cdn.prod.website-files.com/6013fff62154adaa4600f932/601ab159d334e32483dbbcbb_online.svg"
                            loading="lazy"
                            alt=""
                            className="invite__online-icon"
                        />
                        <div className="invite__online-h">online</div>
                    </div>
                    <div className="invite__online-friend">
                        <div className="invite__friend-picture-w">
                            <div className="invite__online-bar"></div>
                            <img
                                src="https://cdn.prod.website-files.com/6013fff62154adaa4600f932/601ab1585908791f051d4af4_home__friend-picture-MaryJane.png"
                                loading="lazy"
                                alt=""
                                className="invite__friend-picture"
                            />
                        </div>
                        <div className="invite__friend-info">
                            <div className="invite__friend-name">MaryJane</div>
                            <div className="invite__friend-status">Online</div>
                        </div>
                    </div>
                </div>
                <div className="invite__line"></div>
                <div className="invite__offline">
                    <div className="invite__offline-h-w">
                        <img
                            src="https://cdn.prod.website-files.com/6013fff62154adaa4600f932/601ab15904900760dbfa7f70_offline.svg"
                            loading="lazy"
                            alt=""
                            className="invite__offline-icon"
                        />
                         <div className="invite__offline-h">offline</div>
                    </div>
                    <div className="invite__offline-friend">
                        <div className="invite__friend-picture-w">
                            <div className="invite__offline-bar"></div>
                            <img
                                src="https://cdn.prod.website-files.com/6013fff62154adaa4600f932/601ab1583424fd3ddf23a848_home__friend-picture-420.png"
                                loading="lazy"
                                alt=""
                                className="invite__friend-picture"
                            />

                        <div className="invite__offline-h">
                            <div className="invite__friend-name">{"   "}420</div>
                            <div className="invite__friend-status">{"   "}offline</div>
                        </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default ServerInfo;