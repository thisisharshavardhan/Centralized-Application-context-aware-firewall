
function Dashboard() {
    return (
        <>
        <div className=" flex flex-wrap">

            <div className=" bg-slate-300 m-1">
                server info
                cpu,mem,temp,disk,terminal link,
            </div>
            <div className=" bg-slate-300 m-1">
                network interfaces and live bandwidth and network stats live ,total data transfered,peak speed,top ip,domain accessed
            </div>
            <div className=" bg-slate-300 m-1">
                traffics and flagged security activities,blocked traffic like noof blocked requests,bloacked ip/domain
            </div>
            <div className=" bg-slate-300 m-1">
                overview and navigation links to Endpoints, Application, Policies, Logs & Reports, Settings
            </div>
            <div className=" bg-slate-300 m-1">
                footer with system uptime and version details
            </div>
            <div className=" bg-slate-300 m-1">
                download reports & logs
            </div>
        </div>
        </>

    )
}

export default Dashboard