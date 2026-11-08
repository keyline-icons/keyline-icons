import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WhaleTail({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M8.489 14.04L8.912 12.39C8.97 12.16 8.999 11.93 8.999 11.7C8.999 10.71 8.464 9.79 7.59 9.28L3.999 7.18L4.293 3L4.938 3.22C5.617 3.88 6.538 4.25 7.499 4.25C8.459 4.25 9.38 4.62 10.059 5.29L11.999 7.18L13.938 5.29C14.617 4.63 15.538 4.25 16.499 4.25C17.459 4.25 18.38 3.88 19.059 3.22L19.705 3L19.999 7.18L16.458 9.25C15.553 9.78 14.999 10.74 14.999 11.77C14.999 11.96 15.018 12.16 15.057 12.35L15.579 14.89M1.723 14.79L1.999 14.5C2.911 13.54 4.176 13 5.499 13C6.821 13 8.086 13.54 8.999 14.5C9.911 15.46 11.176 16 12.499 16C13.821 16 15.086 15.46 15.999 14.5C16.911 13.54 18.176 13 19.499 13C20.399 13 21.299 13.25 21.999 13.7L22.458 14M1.723 19.79L1.999 19.5C2.911 18.54 4.176 18 5.499 18C6.821 18 8.086 18.54 8.999 19.5C9.911 20.46 11.176 21 12.499 21C13.821 21 15.086 20.46 15.999 19.5C16.911 18.54 18.176 18 19.499 18C20.399 18 21.299 18.25 21.999 18.7L22.458 19"/>
    </svg>
  )
}
