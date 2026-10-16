import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CctvOff({ size = 24, ...props }: IconProps) {
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
      <path d="M14.6092 14.6092C14.5011 14.6027 14.3948 14.5788 14.2945 14.5382L4.0954 10.4175C3.7175 10.2648 3.47 9.898 3.47 9.4903C3.47 9.362 3.4948 9.2348 3.5429 9.1157L5.1465 5.1465L14.6092 14.6092ZM6.2018 2.545C6.3728 2.2105 6.7167 2 7.0923 2C7.2207 2 7.3479 2.0248 7.4669 2.0729L17.6659 6.1935C18.0439 6.3462 18.2913 6.7131 18.2913 7.1207C18.2913 7.2491 18.2666 7.3763 18.2185 7.4953L16.1851 12.5282L6.2018 2.545ZM16.1851 12.5282L18.0754 7.8495L20.9205 7.6223C20.9469 7.6202 20.9735 7.6191 21.0001 7.6191C21.5523 7.6191 22.0001 8.0669 22.0001 8.6191C22.0001 8.7475 21.9753 8.8747 21.9272 8.9938L19.305 15.484C19.2896 15.5221 19.2719 15.5592 19.252 15.5951L16.1851 12.5282Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12.8937 12.8937L4.47 9.4903L5.9147 5.9147M6.788 10.4269L6.788 17L3 17M3 12L3 22M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
