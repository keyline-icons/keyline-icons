import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChevronLeftToLine({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M16.2929 5.29C16.6834 4.9 17.3164 4.9 17.707 5.29C18.0974 5.68 18.0975 6.32 17.707 6.71L12.414 12L17.707 17.29C18.0974 17.68 18.0975 18.32 17.707 18.71C17.3165 19.1 16.6834 19.1 16.2929 18.71L10.2929 12.71C9.9024 12.32 9.9024 11.68 10.2929 11.29L16.2929 5.29Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M7 4C7.5523 4 8 4.45 8 5V19C8 19.55 7.5523 20 7 20C6.4477 20 6 19.55 6 19V5C6 4.45 6.4477 4 7 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
