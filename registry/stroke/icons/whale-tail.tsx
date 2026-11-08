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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M8.5 14L8.9134 12.39C8.9709 12.16 9 11.93 9 11.7C9 10.71 8.4652 9.79 7.5913 9.28L6.5 8.64C4.949 7.73 4 6.1 4 4.34V3.49C4 3.05 4.545 2.83 4.8638 3.15L4.9393 3.22C5.6185 3.88 6.5396 4.25 7.5 4.25C8.4604 4.25 9.3815 4.62 10.0607 5.29L12 7.18M15.5 14.5L15.0584 12.35C15.0196 12.16 15 11.96 15 11.77C15 10.74 15.5541 9.78 16.4597 9.25L17.5 8.65C19.051 7.74 20 6.1 20 4.34V3.49C20 3.05 19.455 2.83 19.1362 3.15L19.0607 3.22C18.3815 3.88 17.4604 4.25 16.5 4.25C15.5396 4.25 14.6185 4.63 13.9393 5.29L12 7.18M2 14.5C2.9123 13.54 4.1772 13 5.5 13C6.8228 13 8.0877 13.54 9 14.5C9.9123 15.46 11.1772 16 12.5 16C13.8228 16 15.0877 15.46 16 14.5C16.9123 13.54 18.1772 13 19.5 13C20.4 13 21.3 13.25 22 13.7M2 19.5C2.9123 18.54 4.1772 18 5.5 18C6.8228 18 8.0877 18.54 9 19.5C9.9123 20.46 11.1772 21 12.5 21C13.8228 21 15.0877 20.46 16 19.5C16.9123 18.54 18.1772 18 19.5 18C20.4 18 21.3 18.25 22 18.7"/>
    </svg>
  )
}
