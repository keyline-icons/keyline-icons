import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleCheckPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0751 1 23 5.925 23 12C23 12.552 22.552 13 22 13H16C14.3431 13 13 14.343 13 16V22C13 22.552 12.5523 23 12 23C5.9249 23 1 18.075 1 12C1 5.925 5.9249 1 12 1ZM17.1305 7.878C16.6764 7.475 15.9818 7.516 15.5782 7.97L10.5326 13.644L8.4218 11.269C8.0182 10.816 7.3236 10.775 6.8695 11.178C6.4155 11.582 6.3746 12.276 6.7782 12.731L9.7108 16.031C9.9196 16.265 10.2195 16.4 10.5337 16.4C10.8478 16.4 11.1468 16.265 11.3555 16.031L17.2218 9.431C17.6254 8.976 17.5845 8.282 17.1305 7.878Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M19 16V22M16 19H22"/>
    </svg>
  )
}
