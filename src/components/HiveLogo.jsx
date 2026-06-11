/**
 * Hive Media logo — exact vector trace of the original logo-hive.webp.
 * Slats assemble on load + shimmy on hover; letters cascade in after
 * the hive (CSS in index.css).
 */
export default function HiveLogo({ className = "" }) {
  return (
    <span className={`hive-logo inline-flex items-center ${className}`}>
      <svg viewBox="0 0 264 120" className="h-full w-auto" aria-hidden="true" fill="#facc15">
        <path className="hive-slat slat-1" fillRule="evenodd" d="M26.3 15.8L28.0 12.0L32.5 7.0L40.1 3.0L45.1 2.2L59.2 3.0L64.2 5.3L68.0 8.3L72.0 13.5L72.8 15.9L71.9 17.0L26.8 17.0Z" />
        <path className="hive-slat slat-2" fillRule="evenodd" d="M9.3 35.5L12.0 28.0L16.3 24.0L21.1 22.0L77.4 22.0L82.7 24.0L87.0 28.6L88.7 31.3L89.8 35.6L89.7 37.7L88.4 39.2L10.6 39.2L9.3 37.7Z" />
        <path className="hive-slat slat-3" fillRule="evenodd" d="M1.1 54.5L2.0 51.0L5.3 47.0L8.5 45.0L11.3 44.5L87.9 44.5L93.7 47.0L96.0 49.5L97.3 53.0L97.8 59.4L95.7 62.2L2.8 62.2L1.0 59.9Z" />
        <path className="hive-slat slat-4" fillRule="evenodd" d="M4.8 73.0L6.0 69.5L9.6 67.2L89.4 67.2L91.2 68.0L93.7 71.3L94.0 75.9L93.2 78.2L89.7 83.0L84.2 85.0L14.3 85.0L10.5 84.0L7.0 81.0L5.0 76.9Z" />
        <path className="hive-slat slat-5" fillRule="evenodd" d="M15.3 91.5L16.8 89.8L81.9 89.8L83.0 90.6L83.0 94.4L82.0 97.0L79.0 101.5L73.8 106.1L68.7 110.0L59.2 115.0L52.9 116.8L45.8 116.8L35.3 113.0L24.8 106.0L17.3 98.0Z M42.2 101.8L43.0 106.0L45.0 108.0L48.8 109.0L53.7 108.0L56.0 106.0L57.0 103.7L56.0 99.3L53.7 97.3L51.2 96.5L45.8 97.3L43.3 99.3Z" />
        <path className="hive-letter letter-1" fillRule="evenodd" d="M115.3 17.2L124.7 17.3L125.1 31.8L139.7 31.7L140.3 17.3L149.5 17.3L149.5 55.7L148.4 56.2L140.3 55.7L140.2 40.3L133.4 39.8L124.8 40.3L124.5 56.0L115.3 55.7Z" />
        <path className="hive-letter letter-2" fillRule="evenodd" d="M155.1 19.2L157.3 16.0L161.2 15.2L164.7 17.5L165.2 20.6L163.5 23.7L158.8 24.5L155.8 22.5Z M156.1 27.5L163.9 27.0L165.0 28.1L165.0 55.1L164.4 56.2L156.0 55.9Z" />
        <path className="hive-letter letter-3" fillRule="evenodd" d="M168.1 27.2L176.7 27.0L177.5 27.8L183.6 46.0L184.7 45.0L190.8 27.3L199.7 27.3L197.5 33.8L189.0 56.0L179.3 56.2L178.0 54.7L168.0 28.7Z" />
        <path className="hive-letter letter-4" fillRule="evenodd" d="M200.1 38.5L203.0 32.0L206.0 29.0L209.5 27.3L215.9 26.5L219.2 27.0L223.5 29.0L228.0 34.8L229.0 38.1L229.0 43.7L208.8 44.0L208.2 44.9L209.1 46.8L213.6 50.0L217.7 49.7L221.3 47.0L228.2 49.3L228.0 50.7L224.7 54.2L220.0 56.7L213.8 57.2L208.0 56.0L203.0 52.0L201.0 48.7L200.0 45.4Z M208.8 37.3L209.1 38.8L220.4 38.8L220.8 37.3L219.8 35.7L216.2 33.3L213.3 33.2L211.0 34.3Z" />
        <path className="hive-letter letter-5" fillRule="evenodd" d="M115.3 65.2L125.5 64.8L135.3 85.5L136.4 85.8L146.0 65.0L156.0 64.8L156.5 102.7L148.0 102.7L148.0 91.7L148.2 79.8L147.3 79.3L139.5 96.2L138.2 97.0L132.8 96.7L124.3 79.8L124.0 102.7L115.5 103.0Z" />
        <path className="hive-letter letter-6" fillRule="evenodd" d="M160.1 87.5L162.3 81.0L167.3 76.0L172.8 74.2L175.9 74.2L181.7 76.0L185.7 79.5L187.7 83.0L188.7 91.0L168.8 91.5L168.5 92.8L170.5 95.7L172.8 97.0L177.2 97.0L182.2 94.2L187.5 96.3L187.8 97.4L184.7 101.0L177.9 104.0L171.6 104.0L166.3 102.0L163.0 99.0L161.0 95.7Z M168.5 85.3L168.8 86.0L173.1 86.2L179.9 86.0L180.2 85.1L179.0 83.2L176.7 81.3L173.1 81.0L170.5 82.3Z" />
        <path className="hive-letter letter-7" fillRule="evenodd" d="M190.8 86.5L192.0 82.3L194.0 79.0L199.5 75.0L205.2 74.2L212.2 77.0L212.2 64.6L212.8 64.0L219.9 64.0L220.7 64.8L220.8 81.1L220.4 103.0L212.8 103.0L211.9 100.8L208.7 103.0L205.2 104.0L197.8 102.7L194.0 99.7L192.0 96.5L190.8 91.7Z M199.0 88.3L200.0 93.5L202.3 95.7L205.1 96.5L210.0 95.0L211.7 93.0L212.5 89.9L211.0 84.0L206.9 81.8L203.3 82.0L201.3 83.3Z" />
        <path className="hive-letter letter-8" fillRule="evenodd" d="M224.8 66.5L226.3 64.3L230.9 63.2L234.0 65.3L234.5 68.8L232.2 72.0L228.1 72.2L225.3 70.5Z M225.6 76.2L226.3 75.5L234.0 76.1L234.0 102.8L226.6 103.2L225.5 102.7Z" />
        <path className="hive-letter letter-9" fillRule="evenodd" d="M237.3 93.5L239.0 89.8L243.0 87.0L255.2 85.4L254.2 82.5L252.2 81.2L249.0 81.3L247.0 82.3L245.7 84.2L239.0 83.2L238.2 82.3L240.0 79.0L245.6 75.0L250.1 74.2L255.6 75.0L259.7 77.0L262.8 81.3L263.5 102.5L262.4 103.2L256.1 103.0L255.7 101.0L255.1 101.0L250.2 103.8L246.3 104.0L242.3 103.0L238.3 99.5L237.2 96.7Z M245.5 94.3L246.3 96.7L249.1 97.5L252.5 96.7L254.8 94.4L254.7 91.5L247.3 92.0Z" />
      </svg>
      <span className="sr-only">Hive Media</span>
    </span>
  );
}
