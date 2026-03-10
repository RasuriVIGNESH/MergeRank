export const getStatusColor = (readiness) => {
    if (readiness >= 80) return 'bg-emerald-100 text-emerald-700'; // Excellent
    if (readiness >= 60) return 'bg-blue-100 text-blue-700'; // Good
    if (readiness >= 40) return 'bg-amber-100 text-amber-700'; // Needs Improvement
    return 'bg-rose-100 text-rose-700'; // At Risk
};

export const getStatusTextColor = (readiness) => {
    if (readiness >= 80) return 'text-emerald-500';
    if (readiness >= 60) return 'text-blue-500';
    if (readiness >= 40) return 'text-amber-500';
    return 'text-rose-500';
};

export const getStatusBgColor = (readiness) => {
    if (readiness >= 80) return 'bg-emerald-500';
    if (readiness >= 60) return 'bg-blue-500';
    if (readiness >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
};

export const getStatusText = (readiness) => {
    if (readiness >= 80) return 'Excellent';
    if (readiness >= 60) return 'Good';
    if (readiness >= 40) return 'Needs Improvement';
    return 'At Risk';
};
