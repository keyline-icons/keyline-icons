import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DraftingCompass({ size = 24, ...props }: IconProps) {
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
      <path d="M21.25 13.6538L21 13.9373C18.722 16.5203 15.444 18 12 18C8.556 18 5.278 16.5203 3 13.9373L2.75 13.6538" fill="none" strokeOpacity="0.4"/>
      <path d="M12 1L12 4M11.1984 7.8323L4.7379 22.5992M12.8016 7.8323L19.2621 22.5992" fill="none"/>
      <path d="M15 6C15 7.6569 13.6569 9 12 9C10.3431 9 9 7.6569 9 6C9 4.3431 10.3431 3 12 3C13.6569 3 15 4.3431 15 6Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
