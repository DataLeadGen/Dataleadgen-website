// charts.js - Handle all chart visualizations using Chart.js

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the sample leads page with charts
    if (document.querySelector('#industryChart')) {
        initCharts();
    }
});

// Function to initialize all charts
function initCharts() {
    initIndustryChart();
    initQualityMetricsChart();
    initMonthlyLeadsChart();
    initCompanySizeChart();
}

// Initialize Industry Distribution Chart
function initIndustryChart() {
    const ctx = document.getElementById('industryChart').getContext('2d');
    
    // Get data from the data attribute
    const chartData = JSON.parse(document.getElementById('industryChart').dataset.chart);
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chartData.labels,
            datasets: [{
                data: chartData.data,
                backgroundColor: [
                    '#0056b3',
                    '#1a75ff',
                    '#3385ff',
                    '#4d94ff',
                    '#66a3ff',
                    '#80b3ff',
                    '#99c2ff'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Industry Distribution',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

// Initialize Lead Quality Metrics Chart
function initQualityMetricsChart() {
    const ctx = document.getElementById('qualityChart').getContext('2d');
    
    // Get data from the data attribute
    const chartData = JSON.parse(document.getElementById('qualityChart').dataset.chart);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Percentage (%)',
                data: chartData.data,
                backgroundColor: '#1a75ff',
                borderColor: '#0056b3',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Lead Quality Metrics',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Initialize Monthly Leads Chart
function initMonthlyLeadsChart() {
    const ctx = document.getElementById('monthlyChart').getContext('2d');
    
    // Get data from the data attribute
    const chartData = JSON.parse(document.getElementById('monthlyChart').dataset.chart);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Leads Generated',
                data: chartData.data,
                fill: true,
                backgroundColor: 'rgba(0, 86, 179, 0.1)',
                borderColor: '#0056b3',
                tension: 0.4,
                pointBackgroundColor: '#0056b3',
                pointBorderColor: '#fff',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Lead Generation',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Leads'
                    }
                }
            }
        }
    });
}

// Initialize Company Size Distribution Chart
function initCompanySizeChart() {
    const ctx = document.getElementById('companySizeChart').getContext('2d');
    
    // Get data from the data attribute
    const chartData = JSON.parse(document.getElementById('companySizeChart').dataset.chart);
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chartData.labels,
            datasets: [{
                data: chartData.data,
                backgroundColor: [
                    '#0056b3',
                    '#1a75ff',
                    '#3385ff',
                    '#4d94ff',
                    '#66a3ff'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Company Size Distribution',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}
