// 西進武嶺 SUB4 16週訓練計劃 - Utility Functions Module

// Format date for display (e.g., "3/15 (六)")
export function formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekday = weekdays[date.getDay()];
    return `${month}/${day} (${weekday})`;
}

// Format date short (e.g., "3/15")
export function formatDateShort(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
}

// Get local timezone date string (YYYY-MM-DD)
export function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Format time in minutes to readable format
export function formatTimeMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours > 0) {
        return mins > 0 ? `${hours}h${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
}

// Escape XML special characters
export function escapeXml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Get phase in English
export function getPhaseEnglish(phase) {
    const phases = {
        '基礎期': 'base',
        '建構期': 'build',
        '巔峰期': 'peak',
        '減量期': 'taper',
        '賽前週': 'race-week'
    };
    return phases[phase] || 'training';
}

// Format seconds to time string
export function formatSeconds(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}:${String(secs).padStart(2, '0')}` : `${mins}min`;
}

// Format duration label (e.g., "10min", "5km")
export function formatDurationLabel(step) {
    if (!step.endCondition) return '';

    const value = step.endConditionValue;
    const type = step.endCondition.conditionTypeKey;

    if (type === 'time') {
        const mins = Math.floor(value / 60);
        const secs = value % 60;
        return secs > 0 ? `${mins}:${String(secs).padStart(2, '0')}` : `${mins}min`;
    } else if (type === 'distance') {
        const km = value / 1000;
        return km >= 1 ? `${km}km` : `${value}m`;
    }
    return '';
}

// Get step type label in Chinese
export function getStepTypeLabel(stepType) {
    if (!stepType) return '';

    const labels = {
        'warmup': '暖身',
        'cooldown': '緩和',
        'interval': '間歇',
        'rest': '休息',
        'recovery': '恢復',
        'repeat': '重複',
        'active': '訓練'
    };

    return labels[stepType.stepTypeKey] || stepType.stepTypeKey;
}

// Get target description
export function formatTargetDescription(step, userFTP) {
    if (!step.targetType) return '';

    const targetKey = step.targetType.workoutTargetTypeKey;

    if (targetKey === 'power' && step.targetValueOne && step.targetValueTwo) {
        return `${step.targetValueOne}-${step.targetValueTwo}W`;
    } else if (targetKey === 'power.zone' && step.targetValueOne) {
        return `Zone ${step.targetValueOne}`;
    } else if (targetKey === 'no.target') {
        return '自由騎';
    }

    return '';
}
