function calculateReadiness(student) {

    const totalSolved = student.totalSolved || 0
    const rating = student.leetcodeRating || 0
    const recentSubmissions = student.recentSubmissions || 0

    const problemScore = Math.min((totalSolved / 300) * 100, 100)
    const ratingScore = Math.min((rating / 2400) * 100, 100)
    const consistencyScore = Math.min((recentSubmissions / 50) * 100, 100)

    const readiness =
        (problemScore * 0.5) +
        (ratingScore * 0.3) +
        (consistencyScore * 0.2)

    return Math.round(readiness)
}

function getStatus(readiness) {

    if (readiness >= 80) return "Excellent"
    if (readiness >= 60) return "Good"
    if (readiness >= 40) return "Needs Improvement"

    return "At Risk"
}

module.exports = {
    calculateReadiness,
    getStatus
}