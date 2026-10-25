import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarFront({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19.8245 9.4396C21.1603 10.1241 22.0004 11.499 22 13L22 18.0346C22.0002 19.6725 20.6724 21.0003 19.0346 21.0003C17.7688 21.0003 16.6425 20.1969 16.2306 19L7.7694 19C7.3575 20.1969 6.2312 21.0003 4.9654 21.0003C3.3276 21.0003 1.9998 19.6725 2 18.0346L2 13C1.9996 11.499 2.8397 10.1241 4.1755 9.4396L4.3941 8.7122C4.405 8.6758 4.418 8.6401 4.433 8.6053L5.8011 5.421C6.4322 3.952 7.8774 3 9.4762 3L14.5238 3C16.1226 3 17.5678 3.952 18.1989 5.421L19.567 8.6053C19.582 8.6401 19.595 8.6758 19.6059 8.7122L19.8245 9.4396Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 10L18 10C18.3506 10 18.6872 10.0602 19 10.1707C20.1652 10.5825 21 11.6937 21 13L21 18.0346C21 19.12 20.12 20 19.0346 20C18.1327 20 17.3465 19.3862 17.1278 18.5113L17 18L7 18L6.8722 18.5113C6.6535 19.3862 5.8673 20 4.9654 20C3.88 20 3 19.12 3 18.0346L3 13C3 11.6937 3.8348 10.5825 5 10.1707C5.3128 10.0602 5.6494 10 6 10ZM5 10.1707L5.3518 9L6.7199 5.8157C7.1932 4.714 8.2771 4 9.4762 4L14.5238 4C15.7229 4 16.8068 4.714 17.2801 5.8157L18.6482 9L19 10.1707M5.35177 9L3.5 9M18.6482 9L20.5 9M8 13.5L8 14.5M16 13.5L16 14.5" fill="none"/>
    </svg>
  )
}
