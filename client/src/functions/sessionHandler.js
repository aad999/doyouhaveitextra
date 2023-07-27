const sess = {
    getDonor : () => {
        if (localStorage.getItem("donor")) {
            const donor_id = JSON.parse(localStorage.getItem("donor"))._id;
            return donor_id;
        }
        return null;
    },
    
    getNGO : () => {
        if (localStorage.getItem("ngo")) {
            const ngo_id = JSON.parse(localStorage.getItem("ngo"))._id;
            return ngo_id;
        }
        return null;
    },

    getAdmin : () => {
        if (localStorage.getItem("admin")) {
            const admin_id = JSON.parse(localStorage.getItem("admin"))._id;
        }
        return null;
    },
    
    setDonor : (res) => {
        localStorage.clear();
        const donor = res.data.donor._doc;
        if (donor) {
            localStorage.setItem("donor", JSON.stringify({ ...donor, password: '' }));
        }
    },
    
    setNGO : (res) => {
        localStorage.clear();
        const ngo = res.data.ngo._doc;
        console.log(ngo);
        if (ngo) {
            localStorage.setItem("ngo", JSON.stringify({ ...ngo, password: '' }));
        }
    },

    setAdmin : (res) => {
        localStorage.clear();
        const admin = res.data.admin._doc;
        console.log(admin);
        if (admin) {
            localStorage.setItem("admin", JSON.stringify({ ...admin, password: '' }));
        }
    },
    
    rem : () => {
        localStorage.clear();
    },
}

export default sess;